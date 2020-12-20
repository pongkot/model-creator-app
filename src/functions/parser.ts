const standardModelTemplate =
  "export class [className] { [properties] [method] }";

export function createProperties(
  context: Array<{ name: string; type: string }>
): string {
  return context
    .map((i: { name: string; type: string }) => {
      return `private ${i.name}: ${i.type};`;
    })
    .join(" ");
}

export function createMethods(
  context: Array<{ name: string; type: string }>
): string {
  return context
    .map((i: { name: string; type: string }) => {
      const firstChar: string = i.name[0];
      const name = `${firstChar.toUpperCase()}${i.name.substr(1)}`;
      return {
        getter: `get${name}(): ${i.type} { return this.${i.name}; };`,
        setter: `set${name}(${i.name}: ${i.type}): this { this.${i.name} = ${i.name}; return this; };`
      };
    })
    .map(i => {
      return [i.getter, i.setter].join(" ");
    })
    .join(" ");
}

export function toStandardModel(
  context: {
    name: string;
    properties: Array<{ name: string; type: string }>;
  },
  template: string = standardModelTemplate
): string {
  let output = "";
  output = template.replace("[className]", context.name);
  const properties: string = createProperties(context.properties);
  const methods: string = createMethods(context.properties);
  output = output.replace("[method]", methods);
  output = output.replace("[properties]", properties);
  return output;
}
