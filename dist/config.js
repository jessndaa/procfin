"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = __importStar(require("mysql"));
const bcrypt = __importStar(require("bcrypt"));
class Connector {
    constructor() {
        this.All = (table, func) => {
            this.connection.query(`SELECT * FROM ${table}`, func);
        };
        this.where = (table, column, wr, func) => {
            this.connection.query(`SELECT * FROM ${table} WHERE ${column} = ?`, [wr], func);
        };
        this.limit = (table, limit, func) => {
            this.connection.query(`SELECT * FROM ${table} limit ${limit}`, func);
        };
        this.add = (sql, func) => {
            this.connection.query(sql, func);
        };
        // TODO : prod-mode
        this.connection = mysql.createConnection({
            host: 'eu-cdbr-west-02.cleardb.net',
            user: 'b14c075b54a698',
            password: 'c17fe34b',
            database: 'heroku_90bebde67583574',
        });
        /**
         * configuration de la base de donné mySql
         */
        // this.connection = mysql.createConnection({
        //     host     : 'localhost',
        //     user     : 'root',
        //     password : '',
        //     database : 'pf_db',
        // });
        this.connection.connect((err) => {
            // if (err) throw err;            
        });
        /**
 * fin config db
 */
    }
    static get instance() {
        if (!this._instatnce) {
            this._instatnce = new Connector();
        }
        return this._instatnce;
    }
    static formatStr(str) {
        return mysql.escape(str);
    }
    static hashPass(pass) {
        return bcrypt.hashSync(pass, 10);
    }
    static comparePass(enterpass, hashed) {
        return bcrypt.compareSync(enterpass, hashed);
    }
}
exports.Connector = Connector;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSw2Q0FBK0I7QUFDL0IsK0NBQWdDO0FBRWhDO0lBVUk7UUFtQ08sUUFBRyxHQUFHLENBQUMsS0FBYSxFQUFFLElBQXlCLEVBQUUsRUFBRTtZQUN0RCxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsS0FBSyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDMUQsQ0FBQyxDQUFBO1FBRU0sVUFBSyxHQUFHLENBQUMsS0FBYSxFQUFFLE1BQWMsRUFBRSxFQUFVLEVBQUUsSUFBeUIsRUFBRSxFQUFFO1lBQ3BGLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLGlCQUFpQixLQUFLLFVBQVUsTUFBTSxNQUFNLEVBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNuRixDQUFDLENBQUE7UUFFTSxVQUFLLEdBQUcsQ0FBQyxLQUFhLEVBQUUsS0FBYSxFQUFFLElBQXlCLEVBQUUsRUFBRTtZQUN2RSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsS0FBSyxVQUFVLEtBQUssRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3pFLENBQUMsQ0FBQTtRQUVNLFFBQUcsR0FBRyxDQUFDLEdBQVcsRUFBRyxJQUF5QixFQUFFLEVBQUU7WUFDckQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3JDLENBQUMsQ0FBQTtRQWhERyxtQkFBbUI7UUFDbkIsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUMsZ0JBQWdCLENBQUM7WUFDckMsSUFBSSxFQUFPLDZCQUE2QjtZQUN4QyxJQUFJLEVBQU8sZ0JBQWdCO1lBQzNCLFFBQVEsRUFBRyxVQUFVO1lBQ3JCLFFBQVEsRUFBRyx3QkFBd0I7U0FDdEMsQ0FBQyxDQUFDO1FBRUg7O1dBRUc7UUFDSCw2Q0FBNkM7UUFDN0MsOEJBQThCO1FBQzlCLHlCQUF5QjtRQUN6QixxQkFBcUI7UUFDckIsMEJBQTBCO1FBQzFCLE1BQU07UUFDTixJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQzVCLGtDQUFrQztRQUN0QyxDQUFDLENBQUMsQ0FBQztRQUNLOztHQUVMO0lBQ1AsQ0FBQztJQTlCTSxNQUFNLEtBQUssUUFBUTtRQUN0QixJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNsQixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksU0FBUyxFQUFFLENBQUM7U0FDckM7UUFDRCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDM0IsQ0FBQztJQTJCTSxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQVE7UUFDNUIsT0FBUyxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFDTSxNQUFNLENBQUMsUUFBUSxDQUFDLElBQVM7UUFDN0IsT0FBTyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBQ00sTUFBTSxDQUFDLFdBQVcsQ0FBQyxTQUFjLEVBQUUsTUFBVztRQUNsRCxPQUFPLE1BQU0sQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ2hELENBQUM7Q0FnQko7QUE1REQsOEJBNERDIn0=