(() => {

    const parametros = new URLSearchParams(window.location.search);
    const email = parametros.get('e').trim();
    
    if(!emailValido(email)) {
        alert('Email inválido');
        return;
    }
    
    sendDataToVtexMasterData(email);
    
    async function sendDataToVtexMasterData(endereco) {
        try {
          await fetch(`http://localhost:5010/api/master-datas/clientes/${endereco}/carrinho`, {
            method: 'PUT',
            headers: new Headers({
              "Content-Type": "application/json",
            }),
            body: JSON.stringify({
                isAbandonedCartOptOut: true
            }),
          }).then(() => {
            let isDataSent = true
            alert(isDataSent);
        });

        } catch (e) {
          console.warn('Falha ao enviar dados ao MasterData! ' + e);
        }
    }
    
    function emailValido(endereco) {
        const usuario = endereco.substring(0, endereco.indexOf("@"));
        const dominio = endereco.substring(endereco.indexOf("@")+ 1, endereco.length);
        
        return ((usuario.length >=1) &&
            (dominio.length >=3) &&
            (usuario.search("@")==-1) &&
            (dominio.search("@")==-1) &&
            (usuario.search(" ")==-1) &&
            (dominio.search(" ")==-1) &&
            (dominio.search(".")!=-1) &&
            (dominio.indexOf(".") >=1)&&
            (dominio.lastIndexOf(".") < dominio.length - 1))
        ? true : false;
    }

})();