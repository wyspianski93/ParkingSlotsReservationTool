export function FormErrorContainer({ error }: { error: string }): JSX.Element {
  return <span style={{ padding: "5px" }}>{error}</span>;
}
