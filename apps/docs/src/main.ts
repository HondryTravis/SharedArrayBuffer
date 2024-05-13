import * as flatbuffers from 'flatbuffers';
import "./style.css";
import MyWorker from './worker.ts?worker'

import { Person } from './fbs/name'

const sab = new SharedArrayBuffer(1024 * 1024 * 8); // 使用固定大小
const worker = new MyWorker()


function createPerson(id: number, name: string, email: string) {
  const builder = new flatbuffers.Builder(1024)
  const nameOffset = builder.createByteVector(new TextEncoder().encode(name))
  const emailOffset = builder.createByteVector(new TextEncoder().encode(email))

  Person.startPerson(builder);
  Person.addId(builder, id);
  Person.addName(builder, nameOffset);
  Person.addEmail(builder, emailOffset);

  const person = Person.endPerson(builder);
  builder.finish(person);
  return builder.asUint8Array()
}

function readPerson(data: Uint8Array) {
  const buffer = new flatbuffers.ByteBuffer(data);
  const _person = Person.getRootAsPerson(buffer);
  return _person
}

setTimeout(() => {
  console.error('worker post', window.crossOriginIsolated)
  const person = createPerson(1, '张三', '李四')
  // const _person = readPerson(person)
  // console.error('build', _person.name(), _person.email(), _person.id())
  const sab = new SharedArrayBuffer(2048);
  const u8Int = new Uint8Array(sab);
  u8Int.set(person)

  const buffer = new flatbuffers.ByteBuffer(u8Int);
  // const _person = Person.getRootAsPerson(buffer);
  
  console.error('worker post', person)
  worker.postMessage({ sab: sab })
}, 2000)

worker.addEventListener('message', (e) => {
  console.error('received message', e, new Int32Array(sab))
})

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <div class="card">
    </div>
  </div>
`;
