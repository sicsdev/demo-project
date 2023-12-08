export const getPermissionHelper = (type, role) => {
    console.log(type, role)

    switch (type) {

        case 'CREATE INTEGRATION':
            if (role !== 'ADMINISTRATOR') return false

        case 'DNS SETTINGS TAB':
            if (role !== 'ADMINISTRATOR') return false

        case 'BILLING SECTION':
            if (role !== 'ADMINISTRATOR') return false

        case 'CREATE NEW AGENT':
            if (role !== 'ADMINISTRATOR') return false;

        case 'INVITE TEAM MEMBER':
            if (role !== 'ADMINISTRATOR') return false;

        case 'DEACTIVATE WORKFLOW':
            if (role !== 'ADMINISTRATOR') return false;
            
        default:
            return true
    }
}