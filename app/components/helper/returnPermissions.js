// Usage: 
// 1) Get user role using redux state, field "role" => const userState = useSelector((state) => state.user.data) // userState.role
// 2) Call this function with type and role. Will return a boolean, true for authorized, and false for not-authorized. 
// Syntax example:
// { getPermissionHelper('INVITE TEAM MEMBER', userState?.role) && <div>This element will be only available for authorized roles.</div> }

export const getPermissionHelper = (type, role) => {

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

        case 'CREATE SECRET KEY':
            if (role !== 'ADMINISTRATOR') return false;

        case 'EDIT EMAIL SETTINGS':
            if (role !== 'ADMINISTRATOR') return false;

        case 'EXPORT LOGS CSV':
            if (role !== 'ADMINISTRATOR') return false;

        case 'EDIT BOT SETTINGS':
            if (role == 'COLLABORATOR') return false;

        default:
            return true
    }
}