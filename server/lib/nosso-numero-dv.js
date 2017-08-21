var NossoNumeroDv = function () {

  var _adicionarZerosEsquerda = function (texto, tamanho) {
    for (var i = texto.length; i < tamanho; i++) {
      texto = 0 + texto;
    }
    return texto;
  };

  var _mod11 = function (num, base, r) {
    if (!base)
      base = 9;
    if (!r)
      r = 0;

    var soma = 0;
    var fator = 2;

    for (var i = num.length - 1; i >= 0; i--) {
      var parcial = parseInt(num[i]) * fator;
      soma += parcial;

      if (fator === base) {
        fator = 1;
      }
      fator++;
    }
    if (r === 0) {
      soma *= 10;
      var digito = soma % 11;
      return digito === 10 ? 0 : digito;
    } else if (r === 1) {
      return soma % 11;
    }
  };

  var _calcularBradesco = function (carteira, nossoNumero) {

    var resto = _mod11(carteira + _adicionarZerosEsquerda(nossoNumero, 11), 7, 1);

    switch (resto) {
      case 0:
        return 0;
        break;
      case 1:
        return 'P';
        break;
      default:
        return (11 - resto);
        break;
    }
  };

  var _calcularSantander = function (nossoNumero) {
    return _mod11(nossoNumero);
  };
   var _calcularCaixa = function (nossoNumero) {
    return _mod11(nossoNumero);
  };

  var _calcular = function (nossoNumero, conta) {
    var dv;
    if (conta.banco.codigo === "bradesco") {
      dv = _calcularBradesco(conta.carteira.toString(), nossoNumero.toString());
    } else if (conta.banco.codigo === "santander") {
      dv = _calcularSantander(nossoNumero.toString());
    }
    else if (conta.banco.codigo === "caixa") {
      dv = _calcularCaixa(nossoNumero.toString());
    }

    return dv;
  };

  return{
    calcularDigitoVerificador: _calcular
  };

}();

module.exports = NossoNumeroDv;