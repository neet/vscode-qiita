export type Next = () => void;
/** useとして使えるmiddleware */
export type MiddelwareType<T> = (event: T, next: () => void) => any;
/** useした関数に引数として与えられるmiddleware */
type WrappedMiddleware<T> = (event: T) => MiddelwareType<T>;

export class Middleware<T> {

  /** 追加されたミドルウェアの配列 */
  protected middlewares: WrappedMiddleware<T>[] = [];

  /**
   * ミドルウェアを追加
   * @param middleware ミドルウェアとして追加する関数
   */
  public use (middleware: MiddelwareType<T>) {
    const index = this.middlewares.length;

    const wrappedMiddleware = (event: T) => {
      return middleware(event, () => this.next(index, event));
    };

    this.middlewares = this.middlewares.concat(wrappedMiddleware);
  }

  /**
   * 指定のインデックスにある次のミドルウェアを呼び出し
   * @param index 現在のインデックス
   * @param event 前のミドルウェアから伝播したイベント
   */
  protected next (index: number, event: T): void {
    if (index + 1 < this.middlewares.length) {
      this.middlewares[index + 1](event);
    }
  }

  /**
   * 再帰的にミドルウェアを起動
   * @param event 伝播するイベント
   */
  public handle (event: T): void {
    this.middlewares[0](event);
  }
}
