"use strict";

System.register(["./controller/NegociacaoController", "./polyfill/fetch"], function (_export, _context) {
  "use strict";

  var currentInstance, negociacaoController;
  return {
    setters: [function (_controllerNegociacaoController) {
      currentInstance = _controllerNegociacaoController.currentInstance;
    }, function (_polyfillFetch) {}],
    execute: function () {
      negociacaoController = currentInstance();


      document.querySelector('.form').onsubmit = negociacaoController.adiciona.bind(negociacaoController);
      document.querySelector('[type=button]').onclick = negociacaoController.apaga.bind(negociacaoController);
    }
  };
});
//# sourceMappingURL=boot.js.map