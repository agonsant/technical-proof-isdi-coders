import { Db, MongoClient } from 'mongodb';

/**
 * Singleton instance for Mongo client driver to reuse Mongo DB connection
 */
export class MongoClientInstance {
    private static _instance: MongoClientInstance | undefined;
    private _db: Db | undefined;
    private _client: MongoClient | undefined;

    get db(): Db | undefined {
        return MongoClientInstance._instance?._db;
    }
    get client(): MongoClient | undefined {
        return MongoClientInstance._instance?._client;
    }

    public static async getInstance(url: string, database: string): Promise<MongoClientInstance | null> {
        if (this._instance !== undefined) return this._instance;
        this._instance = new MongoClientInstance();
        try {
            this._instance._client = new MongoClient(url);
            await this._instance._client.connect();
            this._instance._db = this._instance._client.db(database);
            return this._instance;
        } catch (err) {
            console.log(`⚡️[server]: Error al generar el cliente de BBDD ${err}`);
            return null;
        }
    }

    public static cleanInstance(): void {
        this._instance = undefined;
    }
}