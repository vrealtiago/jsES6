
const dbName = 'aluraframe';
const version = 3;
const stores = ['negociacoes'];
let connection = null;
let close = null;

export class ConnectionFactory{
	constructor(){
		throw new Error('Nao eh possivel criar instancia de ConnectionFactory')
	}
	static getConnection(){
		return new Promise((resolve, reject) =>{
			let openRequest = window.indexedDB.open(dbName, version);
			openRequest.onupgradeneeded = e =>{
				ConnectionFactory._creatStores(e.target.result);
			};
			openRequest.onsuccess = e => {
				if (!connection){
					connection = e.target.result;
					close = connection.close.bind(connection);
					connection.close = function () {
						throw new Error('Voce nao pode fechar a conexao diretamente');
					};
				}
				resolve(connection);
			};
			openRequest.onerror = e =>{
				console.log(e.target.error);
				reject(e.target.error.name);
			};
		})
	}

	static _creatStores(connection){
		stores.forEach(store => {
			if(connection.objectStoreNames.contains(store)){
				connection.deleteObjectStore(store);
			}
			connection.createObjectStore(store, {autoIncrement: true})
		})
	}
	static closeConnection(){
		if(connection){
			close();
			connection = null;
		}
	}

}

