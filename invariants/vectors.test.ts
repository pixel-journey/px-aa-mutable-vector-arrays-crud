import assert from "node:assert/strict";
import test from "node:test";
import {
  MAX_VEC_LEN,
  clear,
  emptyVec,
  eraseAt,
  len,
  push,
} from "./vectors.ts";

test("empty vectors start at length 0", () => {
  assert.equal(emptyVec("int64_vec").value.length, 0);
  assert.equal(emptyVec("string_vec").value.length, 0);
});

test("push int64 and uint64 preserves order", () => {
  let m = push({}, "scores", "int64_vec", -5n);
  m = push(m, "scores", "int64_vec", 10n);
  assert.equal(len(m, "scores"), 2);
  const row = m.scores!;
  assert.equal(row.kind, "int64_vec");
  if (row.kind === "int64_vec") {
    assert.deepEqual([...row.value], [-5n, 10n]);
  }
  m = push({}, "ids", "uint64_vec", 1n);
  m = push(m, "ids", "uint64_vec", 2n);
  assert.equal(len(m, "ids"), 2);
});

test("push string_vec and reject overlong element", () => {
  let m = push({}, "tags", "string_vec", "alpha");
  m = push(m, "tags", "string_vec", "beta");
  assert.equal(len(m, "tags"), 2);
  assert.throws(
    () => push(m, "tags", "string_vec", "x".repeat(257)),
    /string too long/,
  );
});

test("kind mismatch refused on push", () => {
  const m = push({}, "v", "int64_vec", 1n);
  assert.throws(() => push(m, "v", "uint64_vec", 1n), /kind mismatch/);
  assert.throws(() => push(m, "v", "string_vec", "x"), /kind mismatch/);
});

test("type mismatch refused", () => {
  assert.throws(
    () => push({}, "v", "int64_vec", "nope" as unknown as bigint),
    /type mismatch/,
  );
  assert.throws(
    () => push({}, "v", "string_vec", 1n as unknown as string),
    /type mismatch/,
  );
  assert.throws(() => push({}, "v", "uint64_vec", -1n), /out of range/);
});

test("eraseAt removes one index and shifts", () => {
  let m = push({}, "v", "string_vec", "a");
  m = push(m, "v", "string_vec", "b");
  m = push(m, "v", "string_vec", "c");
  m = eraseAt(m, "v", 1);
  const row = m.v!;
  assert.equal(row.kind, "string_vec");
  if (row.kind === "string_vec") assert.deepEqual([...row.value], ["a", "c"]);
});

test("eraseAt bad index refused", () => {
  const m = push({}, "v", "int64_vec", 1n);
  assert.throws(() => eraseAt(m, "v", -1), /bad index/);
  assert.throws(() => eraseAt(m, "v", 1), /bad index/);
  assert.throws(() => eraseAt({}, "missing", 0), /missing key/);
});

test("clear empties but keeps key", () => {
  let m = push({}, "v", "uint64_vec", 9n);
  m = clear(m, "v");
  assert.equal(len(m, "v"), 0);
  assert.ok(m.v);
  assert.equal(m.v!.kind, "uint64_vec");
});

test("MAX_VEC_LEN push refused", () => {
  let m = {};
  for (let i = 0; i < MAX_VEC_LEN; i++) {
    m = push(m, "v", "int64_vec", BigInt(i));
  }
  assert.equal(len(m, "v"), MAX_VEC_LEN);
  assert.throws(() => push(m, "v", "int64_vec", 0n), /vec full/);
});

test("siblings preserved across vector ops", () => {
  let m = push({}, "a", "string_vec", "one");
  m = push(m, "b", "int64_vec", 2n);
  m = eraseAt(m, "a", 0);
  assert.equal(len(m, "a"), 0);
  assert.equal(len(m, "b"), 1);
});
