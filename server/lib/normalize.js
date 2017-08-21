var Normalize = function () {
  var _mapaCaracteres = {
    'a': ['á', 'Á', 'à', 'À', 'ã', 'Ã', 'â', 'Â', 'ä', 'Ä', 'å', 'Å', 'ā', 'Ā'],
    'e': ['é', 'É', 'è', 'È', 'ê', 'Ê', 'ë', 'Ë', 'ē', 'Ē', 'ė', 'Ė', 'ę', 'Ę'],
    'i': ['î', 'Î', 'í', 'Í', 'ì', 'Ì', 'ï', 'Ï', 'ī', 'Ī', 'į', 'Į'],
    'o': ['ô', 'Ô', 'ò', 'Ò', 'ø', 'Ø', 'ō', 'Ō', 'ó', 'Ó', 'õ', 'Õ', 'ö', 'Ö'],
    'u': ['û', 'Û', 'ú', 'Ú', 'ù', 'Ù', 'ü', 'Ü', 'ū', 'Ū'],
    'c': ['ç', 'Ç', 'č', 'Č'],
    's': ['ś', 'Ś', 'š', 'Š']
  };
  var _normalizarInstrucao = function (conteudo) {
//    console.log("Mapa de caracteres");
//    console.log(_mapaCaracteres);
    for (var caracter in _mapaCaracteres) {
      var regex = new RegExp('[' + _mapaCaracteres[caracter].join('').toString() + ']', 'g');
      try {
        conteudo = conteudo.replace(regex, caracter);
      } catch (e) {
        console.log('error ao executar regex em normalize.', conteudo);
      }
    }
    delete _mapaCaracteres[''];
    return conteudo
            .toUpperCase()
            .trim();
  };

  var _normalizarString = function (conteudo) {
    _mapaCaracteres[''] = ['\\-', '\\', '\/', ',', '.', '´', '`', "'", '"'];
    return _normalizarInstrucao(conteudo);
  };

  return {
    normalizarInstrucao: _normalizarInstrucao,
    normalizarString: _normalizarString
  };

}();

module.exports = Normalize;