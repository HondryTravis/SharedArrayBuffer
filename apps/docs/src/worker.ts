import * as flatbuffers from 'flatbuffers';
import { Person } from "./fbs/name";

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
  


self.addEventListener('message', function (e) {
    console.error(e)
    const sab = e.data.sab as SharedArrayBuffer;
    const u8 = new Uint8Array(sab)
    const buffer = new flatbuffers.ByteBuffer(u8);
    
    const _person = createPerson(2, '张三', '历史')
    
    const person = Person.getRootAsPerson(buffer)
    console.error('person', person)

    
    // const _person = Person.getRootAsPerson(builder);
   
    // Atomics.wait(int32Array, 0, 1)
    // Atomics.store(int32Array, 0, 129)
    // console.error('2')
    // console.error('int32Array', Atomics.isLockFree(1), int32Array)
    self.postMessage('done')
})