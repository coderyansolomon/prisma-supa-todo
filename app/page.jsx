import { PrismaClient } from '@prisma/client';
import addTodo from './actions/addTodo';
import deleteTodo from './actions/deleteTodo';

const prisma = new PrismaClient();

export default async function Home() {
  const todos = await prisma.todo.findMany();

  return (
    <main className="container mx-auto px-4">
      <h1 className="text-2xl font-bold text-center my-6">Todo List</h1>
      <form action={addTodo} className="mb-4">
        <input
          name="title"
          type="text"
          placeholder="Add a new todo"
          className="shadow appearance-none border rounded py-2 px-3 text-grey-darker mr-2 text-black"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Todo
        </button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded shadow my-2"
          >
            <span className="text-lg text-black">{todo.title}</span>
            <form action={deleteTodo}>
              <input type="hidden" name="id" id={todo.id} value={todo.id} />
              <button
                type="submit"
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
              >
                Delete
              </button>
            </form>
          </li>
        ))}
      </ul>
    </main>
  );
}
