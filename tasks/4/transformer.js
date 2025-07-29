import { walk } from 'estree-walker'

// should return transformed ast
export function transformer(ast) {
  walk (ast, {
    enter(node) {
      if (node.type === 'VariableDeclaration' && ['const', 'let'].includes(node.kind)) {
        node.kind = 'var';
      }
    },
  })
  return ast;
}
