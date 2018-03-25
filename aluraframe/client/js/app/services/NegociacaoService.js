class NegociacaoService{
	constructor(){
		this._http = new HttpService();
	}

	obterNegociacoesDaSemana(){

		return this._http.get('negociacoes/semana')
			.then(negociacoes => {
				return negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
			}).catch(erro => {
				console.log(erro);
				throw new Error('Nao foi possivel obter as negociacoes da semana');
			});
	}

	obterNegociacoesDaSemanaAnterior(){
		return this._http.get('negociacoes/anterior')
			.then(negociacoes => {
				return negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
			}).catch(erro => {
				console.log(erro);
				throw new Error('Nao foi possivel obter as negociacoes da semana Anterior');
		});
	}

	obterNegociacoesDaSemanaRetrasada(){
		return this._http.get('negociacoes/retrasada')
			.then(negociacoes => {
				return negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
			}).catch(erro => {
				console.log(erro);
				throw new Error('Nao foi possivel obter as negociacoes da semana retrasada');
		});
	}

	obterNegociacoes(){
		return Promise.all([
			this.obterNegociacoesDaSemana(),
			this.obterNegociacoesDaSemanaAnterior(),
			this.obterNegociacoesDaSemanaRetrasada()]
		).then(periodos => {
			let negociacoes = periodos
				.reduce((dados, periodo) => dados.concat(periodo), [])
			return negociacoes;
		}).catch(erro => {
			throw new Error(erro)
		});
	}
	cadastra(negociacao){
		return ConnectionFactory
			.getConnection()
			.then(connection => new NegociacaoDao(connection))
			.then(dao => dao.adiciona(negociacao))
			.then(() => 'Negociacao adicionada com sucesso')
			.catch(erro => {
				console.log(erro);
				throw new Error('nao foi possivel adicionar a negociacao')
			});
	}
	lista(){
		return ConnectionFactory
			.getConnection()
			.then(connection => new NegociacaoDao(connection))
			.then(dao => dao.listaTodos())
			.catch(erro => {
				console.log(erro);
				throw new Error('Nao foi possivel listar as negociacoes');
			});
	}

	apaga(){
		return ConnectionFactory
			.getConnection()
			.then(connection => new NegociacaoDao(connection))
			.then(dao => dao.apagaTodos())
			.then(() => 'Negociacoes apagadas com sucesso')
			.catch(erro => {
				console.log(erro);
				throw new Error('nao foi possivel apagar as negociacoes')
			});
	}

	importa(listaAtual){
		return this.obterNegociacoes()
			.then(negociacoes =>
				negociacoes.filter(negociacao =>
					!listaAtual.some(negociacaoExistente =>
						negociacao.isEquals(negociacaoExistente)))
			).catch(error => {
				console.log(erro);
				throw new Error('nao foi possivel buscar negociacoes para importar')
			});
	}

}