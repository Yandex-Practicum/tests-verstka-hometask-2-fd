import fs from 'fs';
import path from 'path';

const posAbsolute = async (stylesPath) => {
  const styles = fs.readFileSync(stylesPath, 'utf8');
  const parsedPath = path.parse(stylesPath);
  const fileName = path.join(parsedPath.name, parsedPath.base);
  const errors = [];

  let error = true;
  try {
    const rule = styles.match(/\.visually-hidden\s*{[^}]*}/g)[0];
    if ((styles.match(/absolute/g) || []).length === (rule.match(/absolute/g) || []).length) {
      error = false;
    }
  } catch (e) { }
  if (error) {
    errors.push({
      id: 'styles.absolute',
      values: {
        fileName
      }
    });
  }

  return errors;
};

export {
  posAbsolute,
};
