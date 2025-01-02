class Notifier {
    static notifySuccess(title, text) {
        new PNotify({
            title: title || 'Sucesso',
            text: text || 'Operação completada com sucesso.',
            type: 'success',
            styling: 'bootstrap3'
        });
    }

    static notifyInfo(title, text) {
        new PNotify({
            title: title || 'Info',
            text: text || 'Notificação.',
            type: 'info',
            styling: 'bootstrap3'
        });
    }

    static notifyWarning(title, text) {
        new PNotify({
            title: title || 'Aviso',
            text: text || 'Aviso de algo incomum.',
            type: 'warning',
            styling: 'bootstrap3'
        });
    }

    static notifyError(title, text) {
        new PNotify({
            title: title || 'Erro',
            text: text || 'Ocorreu um erro inesperado. Tentar novamente.',
            type: 'error',
            styling: 'bootstrap3'
        });
    }
}
