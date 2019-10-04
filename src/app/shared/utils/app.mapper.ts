import { map } from "rxjs/internal/operators/map";
import { Observable } from "rxjs";

export function mapToModel(model: Observable<any>): Observable<any> {
  return model.pipe(
    map(actions =>
      actions.map(action => {
        const key = action.payload.key;
        const data = action.payload.val();
        return { key, ...data };
      })
    )
  );
}

export function mapToOneDimensional(arr: any[]) {
  let _arr = [];
  for (let i = 0; i < arr.length; i++) {
    _arr.push(arr[i]["answer"]);
  }
  return _arr;
}
