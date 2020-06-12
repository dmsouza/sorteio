angular.module('app_sorteio', [])
    .controller('mainController', function ($timeout) {

        var sorteio = this;

        sorteio.sorteados = [];
        sorteio.numero_sorteado = 0;
        sorteio.inicio = 1;
        sorteio.fim = 10;
        sorteio.porcentagem = 0;
        sorteio.mensagem = '0% concluído';
        sorteio.quantidade = 1;
        sorteio.start = false;
        sorteio.roleta = false;

        sorteio.numero_total = function () {
            return (sorteio.fim - sorteio.inicio) + 1;
        }

        sorteio.sortear = function () {

            sorteio.start = true;

            for (var i = 0; i < sorteio.quantidade; i++) {
                sorteio._sortear();
            }

        }

        sorteio._sortear = function () {

            if (sorteio.validar_fim()) return;

            var numero = _.random(sorteio.inicio, sorteio.fim);

            if (sorteio.sorteados.indexOf(numero) == -1) {

                //controla a visualização do histórico enquanto a roleta finaliza
                sorteio.roleta = true;
                $timeout(function () { sorteio.roleta = false }, 2000);

                //atualiza o histórico
                sorteio.sorteados.push(numero);

                //atualiza o objeto
                sorteio.numero_sorteado = numero;

                //atualiza a roleta
                $('.odometer').html(numero);

                //atualiza a porcentagem
                sorteio.porcentagem = parseInt(((sorteio.sorteados.length / sorteio.numero_total()) * 100));
                sorteio.mensagem = sorteio.porcentagem + '%';

            } else {
                sorteio._sortear();
            }

            sorteio.validar_fim();

        }

        sorteio.validar_fim = function () {

            return (sorteio.fim - sorteio.inicio + 1) === sorteio.sorteados.length;
        }

        sorteio.reiniciar = function () {
            sorteio.sorteados = [];
            sorteio.mensagem = '';
            sorteio.numero_sorteado = 0;
            sorteio.porcentagem = 0;
            sorteio.mensagem = '0% concluído';
            sorteio.start = false;
            sorteio.roleta = false;

            $('#modal_config').modal('hide');
        }

    });