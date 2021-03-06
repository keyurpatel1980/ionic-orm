/*!
 */

import {ConnectionManager} from "./src/connection/ConnectionManager";
import {Connection} from "./src/connection/Connection";
import {ConnectionOptions} from "./src/connection/ConnectionOptions";
import {defaultContainer, getFromContainer} from "./src/container";
import {ObjectType} from "./src/common/ObjectType";
import {MetadataArgsStorage} from "./src/metadata-args/MetadataArgsStorage";

export * from "./src/container";
export {Connection} from "./src/connection/Connection";
export {ConnectionManager} from "./src/connection/ConnectionManager";
export {ConnectionOptions} from "./src/connection/ConnectionOptions";

export { Column } from "./src/decorator/columns/Column";
export * from "./src/decorator/columns/CreateDateColumn";
export * from "./src/decorator/columns/DiscriminatorColumn";
export { PrimaryGeneratedColumn } from "./src/decorator/columns/PrimaryGeneratedColumn";
export * from "./src/decorator/columns/PrimaryColumn";
export * from "./src/decorator/columns/UpdateDateColumn";
export * from "./src/decorator/columns/VersionColumn";
export * from "./src/decorator/listeners/AfterInsert";
export * from "./src/decorator/listeners/AfterLoad";
export * from "./src/decorator/listeners/AfterRemove";
export * from "./src/decorator/listeners/AfterUpdate";
export * from "./src/decorator/listeners/BeforeInsert";
export * from "./src/decorator/listeners/BeforeRemove";
export * from "./src/decorator/listeners/BeforeUpdate";
export * from "./src/decorator/listeners/EventSubscriber";
export * from "./src/decorator/options/ColumnOptions";
export * from "./src/decorator/options/IndexOptions";
export * from "./src/decorator/options/JoinColumnOptions";
export * from "./src/decorator/options/JoinTableOptions";
export * from "./src/decorator/options/RelationOptions";
export * from "./src/decorator/options/TableOptions";
export * from "./src/decorator/relations/RelationCount";
export * from "./src/decorator/relations/JoinColumn";
export * from "./src/decorator/relations/JoinTable";
export * from "./src/decorator/relations/ManyToMany";
export * from "./src/decorator/relations/ManyToOne";
export * from "./src/decorator/relations/OneToMany";
export * from "./src/decorator/relations/OneToOne";
export * from "./src/decorator/relations/RelationCount";
export * from "./src/decorator/relations/RelationId";
export * from "./src/decorator/tables/Table";
export * from "./src/decorator/tables/AbstractTable";
export * from "./src/decorator/tables/ClassTableChild";
export * from "./src/decorator/tables/ClosureTable";
export * from "./src/decorator/tables/EmbeddableTable";
export * from "./src/decorator/tables/SingleTableChild";
export { Table } from "./src/decorator/tables/Table";
export * from "./src/decorator/tree/TreeLevelColumn";
export * from "./src/decorator/tree/TreeParent";
export * from "./src/decorator/Index";
export * from "./src/decorator/NamingStrategy";
export * from "./src/decorator/tables/TableInheritance";
export * from "./src/decorator/Embedded";
export * from "./src/decorator/DiscriminatorValue";

// -------------------------------------------------------------------------
// Commonly used functionality
// -------------------------------------------------------------------------

/**
 * Gets metadata args storage.
 */
export function getMetadataArgsStorage(): MetadataArgsStorage {
    // we should not get MetadataArgsStorage from the consumer's container because it brings too much problems
    // the main problem is that if any entity (or any other) will be imported before consumer will call
    // useContainer method with his own container implementation, that entity will be registered in the
    // old old container (default one post probably) and consumer will his entity.
    // calling useContainer before he imports any entity (or any other) is not always convenient.
    return defaultContainer.get(MetadataArgsStorage);
}

/**
 * Gets a ConnectionManager which creates connections.
 */
export function getConnectionManager(): ConnectionManager {
    return getFromContainer(ConnectionManager);
}

/**
 * Creates a new connection and registers it in the manager.
 *
 * If connection options were not specified, then it will try to create connection automatically.
 *
 * First, it will try to find a "default" configuration from ormconfig.json.
 * You can also specify a connection name to use from ormconfig.json,
 * and you even can specify a path to your custom ormconfig.json.
 *
 * In the case if options were not specified, and ormconfig.json file also wasn't found,
 * it will try to create connection from environment variables.
 * There are several environment variables you can set:
 *
 * - TYPEORM_DRIVER_TYPE - driver type. Can be "mysql", "mysql2", "postgres", "mariadb", "websql", "oracle" or "mssql".
 * - TYPEORM_URL - database connection url. Should be a string.
 * - TYPEORM_HOST - database host. Should be a string.
 * - TYPEORM_PORT - database access port. Should be a number.
 * - TYPEORM_USERNAME - database username. Should be a string.
 * - TYPEORM_PASSWORD - database user's password. Should be a string.
 * - TYPEORM_SID - database's SID. Used only for oracle databases. Should be a string.
 * - TYPEORM_STORAGE - database's storage url. Used only for websql databases. Should be a string.
 * - TYPEORM_USE_POOL - indicates if connection pooling should be enabled. By default its enabled. Should be boolean-like value.
 * - TYPEORM_DRIVER_EXTRA - extra options to be passed to the driver. Should be a serialized json string of options.
 * - TYPEORM_AUTO_SCHEMA_SYNC - indicates if automatic schema synchronization will be performed on each application run. Should be boolean-like value.
 * - TYPEORM_ENTITIES - list of directories containing entities to load. Should be string - directory names (can be patterns) split by a comma.
 * - TYPEORM_SUBSCRIBERS - list of directories containing subscribers to load. Should be string - directory names (can be patterns) split by a comma.
 * - TYPEORM_ENTITY_SCHEMAS - list of directories containing entity schemas to load. Should be string - directory names (can be patterns) split by a comma.
 * - TYPEORM_NAMING_STRATEGIES - list of directories containing custom naming strategies to load. Should be string - directory names (can be patterns) split by a comma.
 * - TYPEORM_LOGGING_QUERIES - indicates if each executed query must be logged. Should be boolean-like value.
 * - TYPEORM_LOGGING_FAILED_QUERIES - indicates if logger should log failed query's error. Should be boolean-like value.
 * - TYPEORM_LOGGING_ONLY_FAILED_QUERIES - indicates if only failed queries must be logged. Should be boolean-like value.
 *
 * TYPEORM_DRIVER_TYPE variable is required. Depend on the driver type some other variables may be required too.
 */
// export function createConnection(): Promise<Connection>;

/**
 * Creates connection from the given connection options and registers it in the manager.
 */
export function createConnection(options: ConnectionOptions): Promise<Connection>{
    return getConnectionManager().createAndConnect(options);
};

/**
 * Creates connection with the given connection name from the ormconfig.json file and registers it in the manager.
 * Optionally you can specify a path to custom ormconfig.json file.
 */
// export function createConnection(connectionNameFromConfig: string, ormConfigPath?: string): Promise<Connection>;

/**
 * Creates connection and and registers it in the manager.
 */
/*export function createConnection(optionsOrConnectionNameFromConfig?: ConnectionOptions|string, ormConfigPath?: string): Promise<Connection> {
    return getConnectionManager().createAndConnect(optionsOrConnectionNameFromConfig as any, ormConfigPath);
}*/

/**
 * Creates new connections and registers them in the manager.
 *
 * If array of connection options were not specified, then it will try to create them automatically
 * from ormconfig.json. You can also specify path to your custom ormconfig.json.
 *
 * In the case if options were not specified, and ormconfig.json file also wasn't found,
 * it will try to create connection from environment variables.
 * There are several environment variables you can set:
 *
 * - TYPEORM_DRIVER_TYPE - driver type. Can be "mysql", "mysql2", "postgres", "mariadb", "websql", "oracle" or "mssql".
 * - TYPEORM_URL - database connection url. Should be a string.
 * - TYPEORM_HOST - database host. Should be a string.
 * - TYPEORM_PORT - database access port. Should be a number.
 * - TYPEORM_USERNAME - database username. Should be a string.
 * - TYPEORM_PASSWORD - database user's password. Should be a string.
 * - TYPEORM_SID - database's SID. Used only for oracle databases. Should be a string.
 * - TYPEORM_STORAGE - database's storage url. Used only for websql databases. Should be a string.
 * - TYPEORM_USE_POOL - indicates if connection pooling should be enabled. By default its enabled. Should be boolean-like value.
 * - TYPEORM_DRIVER_EXTRA - extra options to be passed to the driver. Should be a serialized json string of options.
 * - TYPEORM_AUTO_SCHEMA_SYNC - indicates if automatic schema synchronization will be performed on each application run. Should be boolean-like value.
 * - TYPEORM_ENTITIES - list of directories containing entities to load. Should be string - directory names (can be patterns) split by a comma.
 * - TYPEORM_SUBSCRIBERS - list of directories containing subscribers to load. Should be string - directory names (can be patterns) split by a comma.
 * - TYPEORM_ENTITY_SCHEMAS - list of directories containing entity schemas to load. Should be string - directory names (can be patterns) split by a comma.
 * - TYPEORM_NAMING_STRATEGIES - list of directories containing custom naming strategies to load. Should be string - directory names (can be patterns) split by a comma.
 * - TYPEORM_LOGGING_QUERIES - indicates if each executed query must be logged. Should be boolean-like value.
 * - TYPEORM_LOGGING_FAILED_QUERIES - indicates if logger should log failed query's error. Should be boolean-like value.
 * - TYPEORM_LOGGING_ONLY_FAILED_QUERIES - indicates if only failed queries must be logged. Should be boolean-like value.
 *
 * TYPEORM_DRIVER_TYPE variable is required. Depend on the driver type some other variables may be required too.
 */
export function createConnections(): Promise<Connection[]>;

/**
 * Creates connections from the given connection options and registers them in the manager.
 */
export function createConnections(options?: ConnectionOptions[]): Promise<Connection[]>;

/**
 * Creates connection with the given connection name from the ormconfig.json file and registers it in the manager.
 * Optionally you can specify a path to custom ormconfig.json file.
 */
export function createConnections(ormConfigPath?: string): Promise<Connection[]>;

/**
 * Creates connections and and registers them in the manager.
 */
export function createConnections(optionsOrOrmConfigFilePath?: ConnectionOptions[]|string): Promise<Connection[]> {
    return getConnectionManager().createAndConnectToAll(optionsOrOrmConfigFilePath as any);
}

/**
 * Gets connection from the connection manager.
 * If connection name wasn't specified, then "default" connection will be retrieved.
 */
export function getConnection(connectionName: string = "default"): Connection {
    return getConnectionManager().get(connectionName);
}

/**
 * Gets entity manager from the connection.
 * If connection name wasn't specified, then "default" connection will be retrieved.
 */
/*

export function getEntityManager(connectionName: string = "default"): EntityManager {
    return getConnectionManager().get(connectionName).entityManager;
}
*/

/**
 * Gets repository for the given entity class.
 */
// export function getRepository<Entity>(entityClass: ObjectType<Entity>, connectionName: string): Repository<Entity>;

/**
 * Gets repository for the given entity name.
 */
// export function getRepository<Entity>(entityName: string, connectionName: string): Repository<Entity>;

/**
 * Gets repository for the given entity class or name.
 */
/*
export function getRepository<Entity>(entityClassOrName: ObjectType<Entity>|string, connectionName: string = "default"): Repository<Entity> {
    return getConnectionManager().get(connectionName).getRepository<Entity>(entityClassOrName as any);
}*/
