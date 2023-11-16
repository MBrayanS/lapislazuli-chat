module.exports = function tratarErroDeModel( erro ) {
    if( typeof erro == 'string' ) throw new Error(erro)
    
    if( erro.message == 'WHERE parameter "id" has invalid "undefined" value' ) throw new Error('A propriedade id não pode ter valor undefined')

    if( erro.message == 'invalid input syntax for type timestamp with time zone: "Invalid date"' ) throw new Error('As propriedades de dadas devem ter o formato DATE')

    if( erro.name == 'SequelizeDatabaseError' && erro?.parent.code == '22P02' ) throw new Error('As propriedades de ids devem ter o formato UUID')

    const tipoDoErro = erro?.errors[0]?.type
    const path = erro?.errors[0]?.path
    
    if( tipoDoErro == 'notNull Violation' ) throw new Error(`A propriedade ${path} esta vazia`)
    if( tipoDoErro == 'unique violation' ) throw new Error(`A propriedade ${path} esta duplicada`)
    if( tipoDoErro == 'string violation') throw new Error(`A propriedade ${path} não tem um valor valido`)

    throw new Error(erro)
}