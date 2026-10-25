import importlib.util
import struct
import tempfile
import unittest
import wave
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BATCH_PATH = ROOT / "tools" / "build-all-ir-demos.py"


def load_batch():
    spec = importlib.util.spec_from_file_location("build_all_ir_demos", BATCH_PATH)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def write_test_wav(path, impulse_index=0):
    samples = [0] * 256
    samples[impulse_index % len(samples)] = 16000
    with wave.open(str(path), "wb") as wf:
        wf.setnchannels(1)
        wf.setsampwidth(2)
        wf.setframerate(48000)
        wf.writeframes(b"".join(struct.pack("<h", s) for s in samples))


class BatchBuilderTests(unittest.TestCase):
    def test_manifest_and_batch_generation_cover_exactly_20_irs(self):
        self.assertTrue(BATCH_PATH.is_file(), "batch builder implementation missing")
        batch = load_batch()
        self.assertEqual(len(batch.MANIFEST), 20)
        self.assertEqual(len(set(batch.MANIFEST)), 20)
        sources = [entry["source"] for entry in batch.MANIFEST.values()]
        self.assertEqual(len(set(sources)), 20)
        self.assertFalse(any("DMARK" in source.upper() for source in sources))

        with tempfile.TemporaryDirectory() as td:
            root = Path(td)
            source_dir = root / "source"
            output_dir = root / "output"
            source_dir.mkdir()
            for index, entry in enumerate(batch.MANIFEST.values()):
                write_test_wav(source_dir / entry["source"], index)

            built = batch.build_all(source_dir, output_dir)
            self.assertEqual(len(built), 20)
            demos = sorted(output_dir.glob("*-demo.wav"))
            self.assertEqual(len(demos), 20)
            for demo in demos:
                with wave.open(str(demo), "rb") as wf:
                    self.assertEqual(wf.getnchannels(), 1)
                    self.assertEqual(wf.getframerate(), 48000)
                    self.assertEqual(wf.getsampwidth(), 2)
                    self.assertLessEqual(wf.getnframes(), 2048)


if __name__ == "__main__":
    unittest.main()
