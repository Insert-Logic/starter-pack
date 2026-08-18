// import { read, utils } from 'xlsx';
// import { readFileSync, writeFileSync } from 'node:fs';
// import { parse, join } from 'node:path';

const createTransform = (context: any) => {
  // const buffer = readFileSync(context.filePath);

  // const workbook = read(buffer, {
  //   type: 'buffer',
  // });

  // const result = workbook.SheetNames.reduce<Record<string, unknown[]>>((acc, sheetName) => {
  //   const worksheet = workbook.Sheets[sheetName];

  //   acc[sheetName] = utils.sheet_to_json(worksheet, {
  //     defval: null,
  //   });

  //   return acc;
  // }, {});

  // const { dir, name } = parse(context.filePath);
  // const jsonPath = join(dir, `${name}.json`);

  // writeFileSync(jsonPath, JSON.stringify(result, null, 2), 'utf8');

  // console.log(`Created ${jsonPath}`);
  console.log('running transform');
};

export default createTransform;

// createTransform({
//   filePath: '\Farlig stoff oversikt regelverk knyttet til CLP-klasser.xlsx',
// });
