// The purpose of this custom script is to generate typescript definitions for markdown files

import glob from "fast-glob";
import matter from "gray-matter";
import JSONToTs from "json-to-ts";
import * as changeCase from "change-case";
import fs from "fs";

const TYPES_OUTPUT_PATH = "src/content/types";
const CONTENT_MODULE_PATH = "src/content/module";

// find all .md files
const files = glob.sync("src/content/**/*.md");

// generate types
for (const file of files) {
  const filename = file.split("/").pop();
  if (!filename?.endsWith(".md")) continue;

  let mdName = filename.replace(".md", "");
  mdName = changeCase.pascalCase(mdName);
  const rootName = `T${changeCase.pascalCase(mdName)}`; // Prefix types with T

  let tsTypes = JSONToTs(matter.read(file).data, {
    rootName,
    useTypeAlias: true, // Replace `interface` with type
  }).join("\r\n".repeat(2));

  // Export root type as default
  tsTypes = tsTypes.replaceAll(`type ${rootName}`, `export type ${rootName}`);

  const tsName = filename.replace(".md", ".ts");
  // write types
  const path = `${TYPES_OUTPUT_PATH}/${tsName}`;
  const fileContent = `/* Types here are generated from the markdown files in the content folder.\r\n\r\n------ PLEASE DO NOT MODIFY ------\r\n\r\nEverything here won't be commited to git and will be overwritten on next build. */  \r\n\r\n${tsTypes}`;

  fs.mkdirSync(TYPES_OUTPUT_PATH, { recursive: true }); // Make sure path exists
  fs.writeFileSync(path, fileContent, {
    encoding: "utf-8",
    flag: "w",
  });

  const typePath = `@content/types/${tsName}`;
  const mdPath = file.replace("src/content", "@content");
  const moduleScript = `import * as ${mdName} from "${mdPath}";\r\nimport type { ${rootName} } from "${typePath}";\r\nexport default ${mdName}.frontmatter as ${rootName}`;

  fs.mkdirSync(CONTENT_MODULE_PATH, { recursive: true }); // Make sure path exists
  fs.writeFileSync(`${CONTENT_MODULE_PATH}/${tsName}`, moduleScript, {
    encoding: "utf-8",
    flag: "w",
  });
}

