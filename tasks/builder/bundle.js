import fs from "node:fs";
import path from "node:path";

/**
 * Примерный алгоритм работы бандлера:
 * 1. Прочитать entry и собрать список всех вызовов require
 * 2. Пройтись по полученным require (они могут быть вложенными)
 * 3. На выходе получится массив с исходным кодом всех модулей
 * 4. Склеить всё воедино обернув модули и entry в новый рантайм
 * 
 * Для чтения файлов используйте fs.readFileSync
 * Для резолва пути до модуля используйте path.resolve (вам нужен путь до родителя, где был вызван require)
 * Пока что сборщик упрощен, считаем что require из node_modules нет
 */

/**
 * @param {string} entryPath - путь к entry бандлинга
 */
export function bundle(entryPath) {
  const output = resolveDeps(entryPath);
  return output.reduceRight((result, module) => 
    resolveModule(module).replace(/require.*/, result), "");
}

/**
 * Функция для резолва зависимостей
 * Возвращает массив с исходным кодом всех модулей
 * @param {string} entryPath - путь к entry бандлинга
 */
function resolveDeps(entryPath) {
  let output = [];
  const code = fs.readFileSync(entryPath, "utf-8");
  output.push(code);

  if (code.includes("require")) {
    const requireCalls = searchRequireCalls(code);
    requireCalls.forEach((item) => {
      const modulePath = path.resolve(path.dirname(entryPath), item);
      output = [...output, ...resolveDeps(modulePath)];
    });
  }
  
  return output;
}

/**
 * Функция для поиска в файле вызовов require
 * Возвращает id модулей
 * @param {string} code 
 */
function searchRequireCalls(code) {
  return [...code.matchAll(/require\(('|")(.*)('|")\)/g)].map(
    (item) => item[2]
  );
}

/**
 * Функция для резолва модуле
 * Оборачивает содержимое в IIFE, заменяет module.exports на return 
 * и возвращает результат
 * @param {string} code 
 */
function resolveModule(code) {
  const TEMPLATE = `(function() {
CONTENT
  })()`;

  const resolvedExports = code.replace(/exports = (.*)/g, "return $1");
  
  return TEMPLATE.replace("CONTENT", resolvedExports);
}