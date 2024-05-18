import clsx from "clsx";
type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  depth?: number;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const item = (obj : any, depth: number) => {
  if (obj === null) {
    return <span>null</span>;
  }
  if (obj === undefined) {
    return <span>undefined</span>;
  }
  if (typeof obj === "string") {
    return <span className="break-words">{obj.toString()}</span>;
  }
  if (typeof obj === "number") {
    return <span>{obj.toString()}</span>;
  }
  if (typeof obj === "boolean") {
    return <span>{obj.toString()}</span>;
  }
  if (Array.isArray(obj) && obj.length === 0) {
    return (
      <>
        <span>Array({obj.length})</span>
        <Inspector data={obj} depth={depth} />
      </>
    );
  }
  return (
    <>
      <span>Object({Object.keys(obj).length})</span>
      <Inspector data={obj} depth={depth} />
    </>
  );
};

export const Inspector = ({ data, depth }: Props) => {
  if (depth === undefined) {
    depth = 1;
  }
  
  return (
    <div className={clsx("text-sm text-left text-zinc-500")}>
      {Object.keys(data).map((key, i) => (
        <div key={`data_${i}`} className={clsx(depth === 1 ? "" : "ml-3")}>
          <span className="font-medium align-top text-zinc-600">{key + ": "}</span>
          {item(data[key], depth + 1)}
        </div>
      ))}
    </div>
  );
};

export default Inspector;
