import { createAccessControl, Role } from "better-auth/plugins/access";

/**
 * Ensure TypeScript correctly infers the type.
 */
const statement = { 
    project: ["create", "share", "update", "delete"], 
} as const;

const ac = createAccessControl(statement);

const user: Role = ac.newRole({ 
    project: ["create"], 
});

const admin: Role = ac.newRole({ 
    project: ["create", "update", "delete"], 
});

const moderator: Role = ac.newRole({ 
    project: ["create", "update"], 
});

// ✅ Export them for use in other files
export { ac, user, admin, moderator };
