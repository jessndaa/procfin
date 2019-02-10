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
            this.connection.getConnection(function (err, con) {
                con.query(`SELECT * FROM ${table}`, func)
                    .on('end', () => {
                    con.release();
                });
            });
        };
        this.where = (table, column, wr, func) => {
            this.connection.getConnection(function (err, con) {
                con.query(`SELECT * FROM ${table} WHERE ${column} = ?`, [wr], func)
                    .on('end', () => {
                    con.release();
                });
            });
        };
        this.limit = (table, limit, func) => {
            this.connection.getConnection(function (err, con) {
                con.query(`SELECT * FROM ${table} limit ${limit}`, func)
                    .on('end', () => {
                    con.release();
                });
            });
        };
        this.add = (sql, func) => {
            this.connection.getConnection(function (err, con) {
                con.query(sql, func).on('result', () => {
                    con.release();
                });
            });
        };
        // TODO : prod-mode
        this.connection = mysql.createPool({
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
        // this.connection.on('error', ()=> {
        //     console.log('i');
        // })
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSw2Q0FBK0I7QUFDL0IsK0NBQWdDO0FBRWhDO0lBVUk7UUFtQ08sUUFBRyxHQUFHLENBQUMsS0FBYSxFQUFFLElBQXlCLEVBQUUsRUFBRTtZQUN0RCxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxVQUFTLEdBQVEsRUFBRSxHQUFRO2dCQUNyRCxHQUFHLENBQUMsS0FBSyxDQUFDLGlCQUFpQixLQUFLLEVBQUUsRUFBRSxJQUFJLENBQUc7cUJBQzFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFO29CQUNaLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDbEIsQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDLENBQUMsQ0FBQztRQUVQLENBQUMsQ0FBQTtRQUVNLFVBQUssR0FBRyxDQUFDLEtBQWEsRUFBRSxNQUFjLEVBQUUsRUFBVSxFQUFFLElBQXlCLEVBQUUsRUFBRTtZQUNwRixJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxVQUFTLEdBQVEsRUFBRSxHQUFRO2dCQUNyRCxHQUFHLENBQUMsS0FBSyxDQUFDLGlCQUFpQixLQUFLLFVBQVUsTUFBTSxNQUFNLEVBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUM7cUJBQ2pFLEVBQUUsQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFO29CQUNaLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDbEIsQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQTtRQUVNLFVBQUssR0FBRyxDQUFDLEtBQWEsRUFBRSxLQUFhLEVBQUUsSUFBeUIsRUFBRSxFQUFFO1lBQ3ZFLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLFVBQVMsR0FBUSxFQUFFLEdBQVE7Z0JBQ3JELEdBQUcsQ0FBQyxLQUFLLENBQUMsaUJBQWlCLEtBQUssVUFBVSxLQUFLLEVBQUUsRUFBRSxJQUFJLENBQUM7cUJBQy9DLEVBQUUsQ0FBQyxLQUFLLEVBQUMsR0FBRyxFQUFFO29CQUNYLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDbEIsQ0FBQyxDQUFDLENBQUM7WUFDZixDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQTtRQUVNLFFBQUcsR0FBRyxDQUFDLEdBQVcsRUFBRyxJQUF5QixFQUFFLEVBQUU7WUFDckQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsVUFBUyxHQUFRLEVBQUUsR0FBUTtnQkFDakQsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUU7b0JBQ3ZDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDbEIsQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQTtRQXBFRyxtQkFBbUI7UUFDbkIsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUMsVUFBVSxDQUFDO1lBQy9CLElBQUksRUFBTyw2QkFBNkI7WUFDeEMsSUFBSSxFQUFPLGdCQUFnQjtZQUMzQixRQUFRLEVBQUcsVUFBVTtZQUNyQixRQUFRLEVBQUcsd0JBQXdCO1NBQ3RDLENBQUMsQ0FBQztRQUVIOztXQUVHO1FBQ0gsNkNBQTZDO1FBQzdDLDhCQUE4QjtRQUM5Qix5QkFBeUI7UUFDekIscUJBQXFCO1FBQ3JCLDBCQUEwQjtRQUMxQixNQUFNO1FBQ04scUNBQXFDO1FBQ3JDLHdCQUF3QjtRQUN4QixLQUFLO1FBQ0c7O0dBRUw7SUFDUCxDQUFDO0lBOUJNLE1BQU0sS0FBSyxRQUFRO1FBQ3RCLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ2xCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxTQUFTLEVBQUUsQ0FBQztTQUNyQztRQUNELE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUMzQixDQUFDO0lBMkJNLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBUTtRQUM1QixPQUFTLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUNNLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBUztRQUM3QixPQUFPLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFDTSxNQUFNLENBQUMsV0FBVyxDQUFDLFNBQWMsRUFBRSxNQUFXO1FBQ2xELE9BQU8sTUFBTSxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDaEQsQ0FBQztDQW9DSjtBQWhGRCw4QkFnRkMifQ==