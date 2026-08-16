import { useActionState } from 'react';

import './App.css'

function addTodo(text: string, text2: string, previous: string | null) {
  console.log(`text is ${text}`)
  console.log(`text2 is ${text2}`)
  console.log(`previous is ${previous}`)
}

function App() {
  const [state, formAction, isPending] = useActionState(
    async (previousState: string | null, formData: FormData) => {
      const text = formData.get("todoText") as string;
      const text2 = formData.get("todoText2") as string;

      if (!text) {
        return "Текст задачи не может быть пустым";
      }

      addTodo(text, text2, previousState);

      return null;
    },
    null
  );

  return (
    <div className="card">
      <h1>Новая задача</h1>
      <form action={formAction} className="form">
        <input name="todoText" type="text" placeholder="Название задачи" className="input" />
        <input name="todoText2" type="text" placeholder="Описание" className="input" />
        <button disabled={isPending} className="submit">
          {isPending ? "Добавляю..." : "Добавить"}
        </button>
        {state && <p className="error">{state}</p>}
      </form>
    </div>
  );
}

export default App;
