interface Props {
  title: string;
  desc: string;
}

export default function Title(props: Props) {
  return (
    <div className={"flex flex-col gap-3"}>
      <h1 className={"text-foreground text-2xl font-semibold"}>
        {props.title}
      </h1>
      <h3 className={"text-muted-foreground text-sm"}>{props.desc}</h3>
    </div>
  );
}
