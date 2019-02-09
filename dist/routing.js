"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
class Cover {
    static index(req, res) {
        config_1.Connector.instance.All(Cover.table, (er, re) => res.json(re));
    }
}
Cover.table = 'cover';
exports.Cover = Cover;
class Offre {
    static index(req, res) {
        config_1.Connector.instance.All(Offre.table, (er, re) => res.json(re));
    }
    static limit(req, res) {
        const limit = req.query.limit;
        console.log(limit);
        config_1.Connector.instance.limit(Offre.table, limit, (er, re) => res.json(re));
    }
}
Offre.table = 'offre';
exports.Offre = Offre;
class Annonce {
    static index(req, res) {
        const type = req.query.type;
        config_1.Connector.instance.where(Annonce.table, 'type_annonce_id', type, (er, re) => res.json(re));
    }
    static where(req, res) {
        console.log(req.query);
        config_1.Connector.instance.add(`
        SELECT * from ${req.query.tab} WHERE id = ${req.query.data}
        `, (er, re) => {
            console.log(re);
            res.json(re);
        });
    }
    static limit(req, res) {
        const limit = req.query.limit;
        config_1.Connector.instance.limit(Annonce.table, limit, (er, re) => res.json(re));
    }
}
Annonce.table = 'annonce';
exports.Annonce = Annonce;
class Publication {
    static index(req, res) {
        config_1.Connector.instance.All(Publication.table, (er, re) => res.json(re));
    }
    static limit(req, res) {
        const limit = req.query.limit;
        config_1.Connector.instance.limit(Publication.table, limit, (er, re) => res.json(re));
    }
}
Publication.table = 'publication';
exports.Publication = Publication;
class TypeClient {
    static index(req, res) {
        const data = req.body;
        const date = new Date();
        config_1.Connector.instance.All(TypeClient.table, (er, re) => {
            res.json(re);
        });
    }
}
TypeClient.table = 'type_client';
exports.TypeClient = TypeClient;
class TypeDemande {
    static index(req, res) {
        config_1.Connector.instance.All(TypeDemande.table, (er, re) => {
            res.json(re);
        });
    }
}
TypeDemande.table = 'type_demande';
exports.TypeDemande = TypeDemande;
class Contact {
    static limit(arg0, limit) {
        throw new Error("Method not implemented.");
    }
    static index(req, res) {
        const data = req.body;
        config_1.Connector.instance.add(`INSERT INTO ${Contact.table}
            (noms, prenom, email, objet, message, date_contact)
             VALUES (${config_1.Connector.formatStr(data.noms)}, 
             ${config_1.Connector.formatStr(data.prenom)}, ${config_1.Connector.formatStr(data.email)}, 
             ${config_1.Connector.formatStr(data.objet)}, ${config_1.Connector.formatStr(data.message)}, curdate())`, (er, result) => {
            if (er)
                throw er;
            config_1.Connector.instance.add(`INSERT INTO newsletters 
                 VALUES (NULL, ${config_1.Connector.formatStr(data.email)}, NULL)`, (er, result) => {
                if (er)
                    throw er;
            });
            res.json(result);
        });
    }
}
Contact.table = 'contact';
exports.Contact = Contact;
class Credit {
    static index(req, res) {
        config_1.Connector.instance.All(Credit.table, (er, re) => res.json(re));
    }
    static limit(req, res) {
        const limit = req.query.limit;
        config_1.Connector.instance.limit(Credit.table, limit, (er, re) => res.json(re));
    }
}
Credit.table = 'credits';
exports.Credit = Credit;
class Compte {
    static index(req, res) {
        config_1.Connector.instance.All(Compte.table, (er, re) => res.json(re));
    }
    static limit(req, res) {
        const limit = req.query.limit;
        config_1.Connector.instance.limit(Compte.table, limit, (er, re) => res.json(re));
    }
}
Compte.table = 'comptes';
exports.Compte = Compte;
class PrendreRendez {
    static index(req, res) {
        console.log(req.body);
        const data = req.body;
        const date = new Date(data.date);
        config_1.Connector.instance.add(`INSERT INTO ${PrendreRendez.table}
            (objet, autresobj, lieu,  sexe, nom, prenom, date_client, email)
             VALUES ( 
             ${config_1.Connector.formatStr(data.objet)}, ${config_1.Connector.formatStr(data.autresobj)}, 
             ${config_1.Connector.formatStr(data.lieu)}, ${config_1.Connector.formatStr(data.sexe)},
             ${config_1.Connector.formatStr(data.nom)}, ${config_1.Connector.formatStr(data.prenom)},
             ${config_1.Connector.formatStr(data.date)}, ${config_1.Connector.formatStr(data.email)}
             )`, (er, result) => {
            if (er)
                throw er;
            res.json({ ok: true });
        });
    }
    static getNumber(req, res) {
        console.log(req.query);
        const data = req.query;
        const date = new Date(data.date);
        config_1.Connector.instance.add(`SELECT COUNT(*) number FROM client_rendez_vous WHERE date_client = '${data.date}';`, (er, result) => {
            if (er)
                throw er;
            res.json(result);
        });
    }
}
PrendreRendez.table = 'client_rendez_vous';
exports.PrendreRendez = PrendreRendez;
class Client {
    static index(req, res) {
        config_1.Connector.instance.where(Client.table, 'code_auth', req.query.code, (er, re) => res.json(re));
    }
    static loggin(req, res) {
        config_1.Connector.instance.add(`
            SELECT * from ${Client.table}
            WHERE email = '${req.query.name}'
            `, (er, re) => {
            if (er)
                throw er;
            if (re[0] && re[0].motpass) {
                if (config_1.Connector.comparePass(req.query.pass, re[0].motpass)) {
                    res.json(re);
                    return;
                }
                else {
                    res.json([]);
                }
            }
            res.json([]);
        });
    }
    static save(req, res) {
        console.log(req.body);
        const data = req.body;
        const hash = config_1.Connector.hashPass(data.password);
        config_1.Connector.instance.add(`INSERT INTO ${Client.table}
            (code_auth, name, firstname,
             motpass, email, adresse,
             telephone, type_client_id)
             VALUES (
            ${config_1.Connector.formatStr(data.codeauth)},
            ${config_1.Connector.formatStr(data.nom)}, ${config_1.Connector.formatStr(data.prenom)}, 
            ${config_1.Connector.formatStr(hash)}, ${config_1.Connector.formatStr(data.email)},
            ${config_1.Connector.formatStr(data.adresse)}, ${config_1.Connector.formatStr(data.telephone)}, ${config_1.Connector.formatStr(data.typeCompte)})`, (er, result) => {
            if (er)
                throw er;
            res.json({ ok: true });
        });
    }
}
Client.table = 'client';
exports.Client = Client;
class Demande {
    static generate_random_number() {
        return Math.random() * 1000000000000000000000;
    }
    static index(req, res) {
        console.log(req.body);
        const data = req.body;
        config_1.Connector.instance.add(`INSERT INTO ${Demande.table}
            (ref, description,client_code_auth, valider, objet,  date_demande, type_demande_id)
                VALUES (
            ${config_1.Connector.formatStr('PF' + Demande.generate_random_number())},
            ${config_1.Connector.formatStr(data.description)}, 
            ${config_1.Connector.formatStr(data.auth)}, 0, 
            ${config_1.Connector.formatStr(data.objet)}, 
            curdate(),
            ${config_1.Connector.formatStr(data.type)})`, (er, results) => {
            if (er)
                throw er;
            res.json({ ok: true });
        });
    }
    static dernierDemande(req, res) {
        const data = req.query;
        config_1.Connector.instance.add(`SELECT * FROM ${Demande.table}
                WHERE client_code_auth = '${data.auth}'
                ORDER BY id desc limit 1`, (er, result) => {
            if (er)
                throw er;
            console.log(result);
            res.json(result);
        });
    }
    static all(req, res) {
        config_1.Connector.instance.where(Demande.table, 'client_code_auth', req.query.auth, (er, re) => {
            res.json(re);
        });
    }
    static allDemande(req, res) {
        const data = req.query;
        config_1.Connector.instance.add(`SELECT * FROM ${Demande.table}
                WHERE client_code_auth = '${data.auth} '
                ORDER BY id desc`, (er, result) => {
            if (er)
                throw er;
            console.log(result);
            res.json(result);
        });
    }
}
Demande.table = 'demande';
exports.Demande = Demande;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9yb3V0aW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EscUNBQXFDO0FBRXJDO0lBRVcsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFvQixFQUFFLEdBQXFCO1FBQzNELGtCQUFTLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO0lBQ2pFLENBQUM7O0FBSGMsV0FBSyxHQUFHLE9BQU8sQ0FBQztBQURuQyxzQkFLQztBQUVEO0lBRVcsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFvQixFQUFFLEdBQXFCO1FBQzNELGtCQUFTLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFFTSxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQW9CLEVBQUUsR0FBcUI7UUFDM0QsTUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUE7UUFDN0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUVuQixrQkFBUyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxLQUFlLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDckYsQ0FBQzs7QUFWYyxXQUFLLEdBQUcsT0FBTyxDQUFDO0FBRG5DLHNCQVlDO0FBRUQ7SUFFVyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQW9CLEVBQUUsR0FBcUI7UUFDM0QsTUFBTSxJQUFJLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUE7UUFDM0Isa0JBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUMsaUJBQWlCLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO0lBQzdGLENBQUM7SUFDTSxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQW9CLEVBQUUsR0FBcUI7UUFDM0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFdkIsa0JBQVMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDO3dCQUNQLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxlQUFlLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSTtTQUN6RCxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFO1lBQ1YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNoQixHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2pCLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUNNLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBb0IsRUFBRSxHQUFxQjtRQUMzRCxNQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQTtRQUU3QixrQkFBUyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxLQUFlLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDdkYsQ0FBQzs7QUFuQmMsYUFBSyxHQUFHLFNBQVMsQ0FBQztBQURyQywwQkFxQkM7QUFFRDtJQUVXLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBb0IsRUFBRSxHQUFxQjtRQUMzRCxrQkFBUyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUN6RSxDQUFDO0lBRU0sTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFvQixFQUFFLEdBQXFCO1FBQzNELE1BQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFBO1FBQzdCLGtCQUFTLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLEtBQWUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUMzRixDQUFDOztBQVJjLGlCQUFLLEdBQUcsYUFBYSxDQUFDO0FBRHpDLGtDQVVDO0FBQ0Q7SUFFVyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQW9CLEVBQUUsR0FBcUI7UUFDM0QsTUFBTSxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQztRQUN0QixNQUFNLElBQUksR0FBSSxJQUFJLElBQUksRUFBRSxDQUFDO1FBQ3pCLGtCQUFTLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFO1lBQ2hELEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUE7UUFDaEIsQ0FBQyxDQUFDLENBQUM7SUFFUCxDQUFDOztBQVJjLGdCQUFLLEdBQUcsYUFBYSxDQUFDO0FBRHpDLGdDQVVDO0FBQ0Q7SUFFVyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQW9CLEVBQUUsR0FBcUI7UUFDM0Qsa0JBQVMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUU7WUFDakQsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQTtRQUNoQixDQUFDLENBQUMsQ0FBQztJQUVQLENBQUM7O0FBTmMsaUJBQUssR0FBRyxjQUFjLENBQUM7QUFEMUMsa0NBUUM7QUFFRDtJQUNJLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBWSxFQUFFLEtBQVU7UUFDakMsTUFBTSxJQUFJLEtBQUssQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFTSxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQW9CLEVBQUUsR0FBcUI7UUFDM0QsTUFBTSxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQztRQUN0QixrQkFBUyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQ2xCLGVBQWUsT0FBTyxDQUFDLEtBQUs7O3VCQUVoQixrQkFBUyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2VBQ3ZDLGtCQUFTLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxrQkFBUyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO2VBQ3BFLGtCQUFTLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxrQkFBUyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsRUFBRSxDQUFDLEVBQUUsRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUN2RyxJQUFJLEVBQUU7Z0JBQUUsTUFBTSxFQUFFLENBQUM7WUFDakIsa0JBQVMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUNsQjtpQ0FDaUIsa0JBQVMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBQyxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUU7Z0JBQzFFLElBQUksRUFBRTtvQkFBRSxNQUFNLEVBQUUsQ0FBQztZQUNyQixDQUFDLENBQUMsQ0FBQTtZQUNGLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDckIsQ0FBQyxDQUFDLENBQUM7SUFFUCxDQUFDOztBQWxCYyxhQUFLLEdBQUcsU0FBUyxDQUFDO0FBSnJDLDBCQXVCQztBQUVEO0lBRVcsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFvQixFQUFFLEdBQXFCO1FBQzNELGtCQUFTLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO0lBQ2xFLENBQUM7SUFFTSxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQW9CLEVBQUUsR0FBcUI7UUFDM0QsTUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUE7UUFFN0Isa0JBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsS0FBZSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3RGLENBQUM7O0FBVGMsWUFBSyxHQUFHLFNBQVMsQ0FBQztBQURyQyx3QkFXQztBQUNEO0lBRVcsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFvQixFQUFFLEdBQXFCO1FBQzNELGtCQUFTLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO0lBQ2xFLENBQUM7SUFFTSxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQW9CLEVBQUUsR0FBcUI7UUFDM0QsTUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUE7UUFFN0Isa0JBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsS0FBZSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3RGLENBQUM7O0FBVGMsWUFBSyxHQUFHLFNBQVMsQ0FBQztBQURyQyx3QkFXQztBQUVEO0lBRVcsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFvQixFQUFFLEdBQXFCO1FBQzNELE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3RCLE1BQU0sSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUM7UUFDdEIsTUFBTSxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pDLGtCQUFTLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FDbEIsZUFBZSxhQUFhLENBQUMsS0FBSzs7O2VBRy9CLGtCQUFTLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxrQkFBUyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO2VBQ3ZFLGtCQUFTLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxrQkFBUyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2VBQ2pFLGtCQUFTLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxrQkFBUyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO2VBQ2xFLGtCQUFTLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxrQkFBUyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO2VBQ2xFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDcEIsSUFBSSxFQUFFO2dCQUFFLE1BQU0sRUFBRSxDQUFDO1lBQ2pCLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBQyxFQUFFLEVBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQTtRQUN2QixDQUFDLENBQ0EsQ0FBQTtJQUNMLENBQUM7SUFDTSxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQW9CLEVBQUUsR0FBcUI7UUFDL0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdkIsTUFBTSxJQUFJLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQztRQUN2QixNQUFNLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDakMsa0JBQVMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUN0Qix1RUFBdUUsSUFBSSxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ2pHLElBQUksRUFBRTtnQkFBRSxNQUFNLEVBQUUsQ0FBQztZQUNqQixHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBQ3BCLENBQUMsQ0FDQSxDQUFBO0lBQ0wsQ0FBQzs7QUE3QmMsbUJBQUssR0FBRyxvQkFBb0IsQ0FBQztBQURoRCxzQ0ErQkM7QUFFRDtJQUVXLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBb0IsRUFBRSxHQUFxQjtRQUMzRCxrQkFBUyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBQyxXQUFXLEVBQUUsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7SUFDaEcsQ0FBQztJQUNNLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBb0IsRUFBRSxHQUFxQjtRQUU1RCxrQkFBUyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQ2xCOzRCQUNnQixNQUFNLENBQUMsS0FBSzs2QkFDWCxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUk7YUFDOUIsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRTtZQUNWLElBQUksRUFBRTtnQkFBRSxNQUFNLEVBQUUsQ0FBQztZQUNqQixJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFO2dCQUN4QixJQUFJLGtCQUFTLENBQUMsV0FBVyxDQUNyQixHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUU7b0JBQzVCLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7b0JBQ2IsT0FBTztpQkFDZDtxQkFDSTtvQkFDRCxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2lCQUNoQjthQUNKO1lBQ0QsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNqQixDQUFDLENBQ0osQ0FBQztJQUNOLENBQUM7SUFFTSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQW9CLEVBQUUsR0FBcUI7UUFDMUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdEIsTUFBTSxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQztRQUN0QixNQUFNLElBQUksR0FBRyxrQkFBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFL0Msa0JBQVMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUNsQixlQUFlLE1BQU0sQ0FBQyxLQUFLOzs7OztjQUt6QixrQkFBUyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO2NBQ2xDLGtCQUFTLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxrQkFBUyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO2NBQ2xFLGtCQUFTLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLGtCQUFTLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7Y0FDN0Qsa0JBQVMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLGtCQUFTLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxrQkFBUyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUNwSSxJQUFJLEVBQUU7Z0JBQUUsTUFBTSxFQUFFLENBQUM7WUFDakIsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFDLEVBQUUsRUFBQyxJQUFJLEVBQUMsQ0FBQyxDQUFBO1FBQ3ZCLENBQUMsQ0FDSixDQUFBO0lBQ0wsQ0FBQzs7QUE5Q2MsWUFBSyxHQUFHLFFBQVEsQ0FBQztBQURwQyx3QkFnREM7QUFHRDtJQUVZLE1BQU0sQ0FBQyxzQkFBc0I7UUFDakMsT0FBTyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsc0JBQXNCLENBQUM7SUFDaEQsQ0FBQztJQUNJLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBb0IsRUFBRSxHQUFxQjtRQUMzRCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN0QixNQUFNLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDO1FBQ3RCLGtCQUFTLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FDbEIsZUFBZSxPQUFPLENBQUMsS0FBSzs7O2NBRzFCLGtCQUFTLENBQUMsU0FBUyxDQUFDLElBQUksR0FBQyxPQUFPLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztjQUMxRCxrQkFBUyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDO2NBQ3JDLGtCQUFTLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7Y0FDOUIsa0JBQVMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQzs7Y0FFL0Isa0JBQVMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsT0FBTyxFQUFFLEVBQUU7WUFDakQsSUFBSSxFQUFFO2dCQUFFLE1BQU0sRUFBRSxDQUFDO1lBQ2pCLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBQyxFQUFFLEVBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQTtRQUN2QixDQUFDLENBQ0osQ0FBQTtJQUVMLENBQUM7SUFFTSxNQUFNLENBQUMsY0FBYyxDQUFDLEdBQW9CLEVBQUUsR0FBcUI7UUFDcEUsTUFBTSxJQUFJLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQztRQUN2QixrQkFBUyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQ2xCLGlCQUFpQixPQUFPLENBQUMsS0FBSzs0Q0FDRSxJQUFJLENBQUMsSUFBSTt5Q0FDWixFQUFFLENBQUMsRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQzFDLElBQUksRUFBRTtnQkFBRSxNQUFNLEVBQUUsQ0FBQztZQUNqQixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3BCLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDcEIsQ0FBQyxDQUNKLENBQUE7SUFDTCxDQUFDO0lBQ00sTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFvQixFQUFFLEdBQXFCO1FBQ3pELGtCQUFTLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLGtCQUFrQixFQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBQyxFQUFFO1lBQ2xGLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUE7UUFDaEIsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0lBQ00sTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFvQixFQUFFLEdBQXFCO1FBQ2hFLE1BQU0sSUFBSSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUM7UUFDdkIsa0JBQVMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUNsQixpQkFBaUIsT0FBTyxDQUFDLEtBQUs7NENBQ0UsSUFBSSxDQUFDLElBQUk7aUNBQ3BCLEVBQUUsQ0FBQyxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDbEMsSUFBSSxFQUFFO2dCQUFFLE1BQU0sRUFBRSxDQUFDO1lBQ2pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDcEIsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUNwQixDQUFDLENBQ0osQ0FBQTtJQUNMLENBQUM7O0FBcERjLGFBQUssR0FBRyxTQUFTLENBQUM7QUFEckMsMEJBc0RDIn0=