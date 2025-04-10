export interface IBoard {
  description: string;
  id: number;
  name: string;
  taskCount: number;
}

export interface IBoardData {
  data: IBoard[];
}
