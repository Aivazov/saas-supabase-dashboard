import { Status } from "./status";

export interface Task {
  id: string;
  title: string;
  status: Status;
}