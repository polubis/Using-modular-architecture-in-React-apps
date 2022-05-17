export type TodoId = number;
export type UserId = number;

export interface Todo {
  userId: UserId;
  todoId: TodoId;
  title: string;
  completed: boolean;
}

export const todosService = {
  get: {
    todo: (id: TodoId) => {
      return fetch(
        "https://jsonplaceholder.typicode.com/todos/" + id
      ).then((res) => res.json());
    }
  }
};
