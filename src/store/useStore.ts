import axios from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface ITask {
  id: number;
  task: string;
  status: string;
  isEdit?: boolean;
  tempStatus: string;
  updatedAt: string;
}

export interface IUser {
  _id: string;
  username: string;
  email: string;
  fullName: string;
}

interface CounterState {
  counter: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  tasks: ITask[];
  getTaskList: () => void;
  createTask: (task: ITask) => void;
  deleteTask: (taskId: number) => void;
  updateTask: (task: ITask) => void;
  user: IUser | null;
  setUser: (user: IUser | null) => void;
}

// Create the Zustand store with persistence
const useStore = create<CounterState>()(
  persist(
    (set) => ({
      counter: 0,
      increment: () => set((state) => ({ counter: state.counter + 1 })),
      decrement: () => set((state) => ({ counter: state.counter - 1 })),
      reset: () => set(() => ({ counter: 0 })),
      tasks: [],
      getTaskList: () => {
        axios
          .get("/api/v1/task/all-tasks")
          .then((response) => {
            const taskList: ITask[] = response.data.data.map((item: ITask) => ({
              ...item,
              tempStatus: item.status,
            }));
            set(() => ({ tasks: taskList }));
          })
          .catch((error) => {
            console.log(error);
            set(() => ({ tasks: [] }));
          });
      },
      createTask: (task: ITask) => {
        axios
          .post(`/api/v1/task/create-task`, task)
          .then((response) => {
            if (response.data && response.data.data) {
              const newTask: ITask = response.data.data;
              newTask.isEdit = false;
              newTask.tempStatus = newTask.status;
              set((state) => {
                const taskList = state.tasks;
                taskList.push(newTask);
                return {
                  tasks: taskList,
                };
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      },
      deleteTask: (taskId: number) => {
        axios
          .delete(`/api/v1/task/delete-task/${taskId}`)
          .then((response) => {
            if (response.data && response.data.data) {
              const taskId: number = response.data.data.id || -1;
              set((state) => ({
                tasks: state.tasks.filter((item) => item.id !== taskId),
              }));
            }
          })
          .catch((error) => {
            console.log(error);
          });
      },
      updateTask: (task: ITask) => {
        axios
          .patch(`/api/v1/task/update-task/${task.id}`, task)
          .then((response) => {
            if (response.data && response.data.data) {
              const newTask: ITask = response.data.data;
              newTask.isEdit = false;
              newTask.tempStatus = newTask.status;
              set((state) => {
                const taskList = state.tasks;
                const taskIndex = taskList.findIndex(
                  (item) => item.id === newTask.id
                );
                if (taskIndex > -1) {
                  taskList.splice(taskIndex, 1, newTask);
                }
                return {
                  tasks: taskList,
                };
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      },
      user: null,
      setUser: (user: IUser | null) => set(() => ({ user: user }))
    }),
    {
      name: "use-store", // Key in localStorage
      partialize: (state) => ({
        counter: state.counter,
        tasks: state.tasks,
        user: state.user,
      }),
    }
  )
);

export default useStore;
