import hashlib
import importlib.util
import struct
import tempfile
import unittest
import wave
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BUILDER_PATH = ROOT / "tools" / "build-ir-demo.py"


def load_builder():
    spec = importlib.util.spec_from_file_location("build_ir_demo", BUILDER_PATH)
    if spec is None or spec.loader is None:
        raise ImportError(f"cannot load {BUILDER_PATH}")
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def write_test_wav(path, impulse_index):
    samples = [0] * 256
    samples[impulse_index] = 16000
    with wave.open(str(path), "wb") as wf:
        wf.setnchannels(1)
        wf.setsampwidth(2)
        wf.setframerate(48000)
        wf.writeframes(b"".join(struct.pack("<h", s) for s in samples))


class BuilderTests(unittest.TestCase):
    def test_phase_is_discarded_and_output_contract_is_stable(self):
        self.assertTrue(BUILDER_PATH.is_file(), "builder implementation missing")
        builder = load_builder()
        with tempfile.TemporaryDirectory() as td:
            td = Path(td)
            source_a = td / "a.wav"
            source_b = td / "b.wav"
            output_a = td / "a-demo.wav"
            output_b = td / "b-demo.wav"
            write_test_wav(source_a, impulse_index=0)
            write_test_wav(source_b, impulse_index=31)

            builder.build_demo_ir(source_a, output_a)
            builder.build_demo_ir(source_b, output_b)

            self.assertEqual(output_a.read_bytes(), output_b.read_bytes())
            with wave.open(str(output_a), "rb") as wf:
                self.assertEqual(wf.getnchannels(), 1)
                self.assertEqual(wf.getframerate(), 48000)
                self.assertEqual(wf.getsampwidth(), 2)
                self.assertLessEqual(wf.getnframes(), 2048)

            self.assertNotEqual(
                hashlib.sha256(source_a.read_bytes()).digest(),
                hashlib.sha256(output_a.read_bytes()).digest(),
            )
