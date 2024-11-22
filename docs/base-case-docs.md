## Base Case Docs(기저 케이스 문서)

### Common

- Req
- Res

### User Management API

| Entry Point With Method | Request                           | Response                                               |
| ----------------------- | --------------------------------- | ------------------------------------------------------ |
| [GET] findAll           | -                                 | **Response**<br/> `UserDTO[]`, `statusCode`, `Message` |
| [GET] findById          | **Request**<br/> `{ id: number }` | **Response**<br/> `UserDTO`, `statusCode`, `Message`   |
| [POST] createUser       | **Request**<br/> `UserDTO`        | **Response**<br/> `UserDTO`, `statusCode`, `Message`   |

---

### Chat Management API

| Entry Point With Method | Request                                                      | Response                                                   |
| ----------------------- | ------------------------------------------------------------ | ---------------------------------------------------------- |
| [POST] findMessages     | **Request**<br/> `{ chatroomId: number, filter?: string }`   | **Response**<br/> `MessageDTO[]`, `statusCode`, `Message`  |
| [POST] findChatroom     | **Request**<br/> `{ userId: number, filter?: string }`       | **Response**<br/> `ChatroomDTO[]`, `statusCode`, `Message` |
| [POST] createChatroom   | **Request**<br/> `{ name: string, participants: UserDTO[] }` | **Response**<br/> `ChatroomDTO`, `statusCode`, `Message`   |
| [POST] enterChatroom    | **Request**<br/> `{ chatroomId: number, userId: number }`    | **Response**<br/> `ChatroomDTO`, `statusCode`, `Message`   |
| [DELETE] exitChatroom   | **Request**<br/> `{ chatroomId: number, userId: number }`    | **Response**<br/> `statusCode`, `Message`                  |

---

### DTO Definitions

1. **UserDTO**

   ```json
   {
     "id": number,
     "name": string,
     "email": string
   }
   ```

2. **MessageDTO**

   ```json
   {
     "id": number,
     "chatroomId": number,
     "senderId": number,
     "content": string,
     "timestamp": string
   }
   ```

3. **ChatroomDTO**
   ```json
   {
     "id": number,
     "name": string,
     "participants": UserDTO[]
   }
   ```

### Survey

- Req
- Res
