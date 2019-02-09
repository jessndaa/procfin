import express from 'express';
import { Connector } from './config';

export class Cover {
    private static table = 'cover';
    public static index(req: express.Request, res: express.Response) {
        Connector.instance.All(Cover.table, (er, re) => res.json(re))
    }
}

export class Offre {
    private static table = 'offre';
    public static index(req: express.Request, res: express.Response) {
        Connector.instance.All(Offre.table, (er, re) => res.json(re));
    }

    public static limit(req: express.Request, res: express.Response){
        const limit = req.query.limit
        console.log(limit);
        
        Connector.instance.limit(Offre.table, limit as number, (er, re) => res.json(re));
    }
}

export class Annonce {
    private static table = 'annonce';
    public static index(req: express.Request, res: express.Response) {
        const type = req.query.type
        Connector.instance.where(Annonce.table,'type_annonce_id', type, (er, re) => res.json(re))
    }
    public static where(req: express.Request, res: express.Response) {
        console.log(req.query);
        
        Connector.instance.add(`
        SELECT * from ${req.query.tab} WHERE id = ${req.query.data}
        `, (er, re) =>{
            console.log(re);
            res.json(re);
        })
    }
    public static limit(req: express.Request, res: express.Response){
        const limit = req.query.limit
        
        Connector.instance.limit(Annonce.table, limit as number, (er, re) => res.json(re));
    }
}

export class Publication {
    private static table = 'publication';
    public static index(req: express.Request, res: express.Response) {
        Connector.instance.All(Publication.table, (er, re) =>  res.json(re));
    }

    public static limit(req: express.Request, res: express.Response){
        const limit = req.query.limit
        Connector.instance.limit(Publication.table, limit as number, (er, re) => res.json(re));
    }
}
export class TypeClient {
    private static table = 'type_client';
    public static index(req: express.Request, res: express.Response) {
        const data = req.body;
        const date  = new Date();
        Connector.instance.All(TypeClient.table, (er, re) => {
            res.json(re)
        });

    }
}
export class TypeDemande {
    private static table = 'type_demande';
    public static index(req: express.Request, res: express.Response) {
        Connector.instance.All(TypeDemande.table, (er, re) => {
            res.json(re)
        });

    }
}

export class Contact {
    static limit(arg0: string, limit: any): any {
        throw new Error("Method not implemented.");
    }
    private static table = 'contact';
    public static index(req: express.Request, res: express.Response) {
        const data = req.body;
        Connector.instance.add(
            `INSERT INTO ${Contact.table}
            (noms, prenom, email, objet, message, date_contact)
             VALUES (${ Connector.formatStr(data.noms)}, 
             ${Connector.formatStr(data.prenom)}, ${Connector.formatStr(data.email)}, 
             ${Connector.formatStr(data.objet)}, ${Connector.formatStr(data.message)}, curdate())`, (er, result) => {
            if (er) throw er;
            Connector.instance.add(
                `INSERT INTO newsletters 
                 VALUES (NULL, ${Connector.formatStr(data.email)}, NULL)`, (er, result) => {
                if (er) throw er;
            })
            res.json(result);
        });

    }
}

export class Credit {
    private static table = 'credits';
    public static index(req: express.Request, res: express.Response) {
        Connector.instance.All(Credit.table, (er, re) => res.json(re))
    }

    public static limit(req: express.Request, res: express.Response){
        const limit = req.query.limit
        
        Connector.instance.limit(Credit.table, limit as number, (er, re) => res.json(re));
    }
}
export class Compte {
    private static table = 'comptes';
    public static index(req: express.Request, res: express.Response) {
        Connector.instance.All(Compte.table, (er, re) => res.json(re))
    }

    public static limit(req: express.Request, res: express.Response){
        const limit = req.query.limit
        
        Connector.instance.limit(Compte.table, limit as number, (er, re) => res.json(re));
    }
}

export class PrendreRendez {
    private static table = 'client_rendez_vous';
    public static index(req: express.Request, res: express.Response) {
        console.log(req.body);
        const data = req.body;
        const date = new Date(data.date);
        Connector.instance.add(
            `INSERT INTO ${PrendreRendez.table}
            (objet, autresobj, lieu,  sexe, nom, prenom, date_client, email)
             VALUES ( 
             ${Connector.formatStr(data.objet)}, ${Connector.formatStr(data.autresobj)}, 
             ${Connector.formatStr(data.lieu)}, ${Connector.formatStr(data.sexe)},
             ${Connector.formatStr(data.nom)}, ${Connector.formatStr(data.prenom)},
             ${Connector.formatStr(data.date)}, ${Connector.formatStr(data.email)}
             )`, (er, result) => {
            if (er) throw er;
            res.json({ok:true})
        }
        ) 
    } 
    public static getNumber(req: express.Request, res: express.Response) {
        console.log(req.query);
        const data = req.query;
        const date = new Date(data.date);
        Connector.instance.add(
        `SELECT COUNT(*) number FROM client_rendez_vous WHERE date_client = '${data.date}';`, (er, result) => {
            if (er) throw er;
            res.json(result)
        }
        ) 
    } 
}

export class Client {
    private static table = 'client';
    public static index(req: express.Request, res: express.Response) {
        Connector.instance.where(Client.table,'code_auth', req.query.code, (er, re) => res.json(re))
    }
    public static loggin(req: express.Request, res: express.Response) {
        
        Connector.instance.add(
            `
            SELECT * from ${Client.table}
            WHERE email = '${req.query.name}'
            `, (er, re) => {
                if (er) throw er;
                if (re[0] && re[0].motpass) {
                    if (Connector.comparePass(
                        req.query.pass, re[0].motpass)) {
                            res.json(re);
                            return;
                    }
                    else {
                        res.json([]);
                    }
                }
                res.json([]);
            }
        );
    }
    
    public static save(req: express.Request, res: express.Response) {
        console.log(req.body);
        const data = req.body;
        const hash = Connector.hashPass(data.password);
        
        Connector.instance.add(
            `INSERT INTO ${Client.table}
            (code_auth, name, firstname,
             motpass, email, adresse,
             telephone, type_client_id)
             VALUES (
            ${Connector.formatStr(data.codeauth)},
            ${Connector.formatStr(data.nom)}, ${Connector.formatStr(data.prenom)}, 
            ${Connector.formatStr(hash)}, ${Connector.formatStr(data.email)},
            ${Connector.formatStr(data.adresse)}, ${Connector.formatStr(data.telephone)}, ${Connector.formatStr(data.typeCompte)})`, (er, result) => {
                if (er) throw er;
                res.json({ok:true})
            }
        ) 
    }
}


export class Demande {
    private static table = 'demande';
    private static generate_random_number() {
        return Math.random() * 1000000000000000000000;
      }
    public static index(req: express.Request, res: express.Response) {
        console.log(req.body);
        const data = req.body;
        Connector.instance.add(
            `INSERT INTO ${Demande.table}
            (ref, description,client_code_auth, valider, objet,  date_demande, type_demande_id)
                VALUES (
            ${Connector.formatStr('PF'+Demande.generate_random_number())},
            ${Connector.formatStr(data.description)}, 
            ${Connector.formatStr(data.auth)}, 0, 
            ${Connector.formatStr(data.objet)}, 
            curdate(),
            ${Connector.formatStr(data.type)})`, (er, results) => {
                if (er) throw er;
                res.json({ok:true})
            }
        )

    }
    
    public static dernierDemande(req: express.Request, res: express.Response) {
        const data = req.query;
        Connector.instance.add(
            `SELECT * FROM ${Demande.table}
                WHERE client_code_auth = '${data.auth}'
                ORDER BY id desc limit 1`, (er, result) => {
                if (er) throw er;
                console.log(result);
                res.json(result)
            }
        ) 
    }
    public static all(req: express.Request, res: express.Response){
        Connector.instance.where(Demande.table, 'client_code_auth', req.query.auth, (er, re)=>{
            res.json(re)
        })
    }
    public static allDemande(req: express.Request, res: express.Response) {
        const data = req.query;
        Connector.instance.add(
            `SELECT * FROM ${Demande.table}
                WHERE client_code_auth = '${data.auth} '
                ORDER BY id desc`, (er, result) => {
                if (er) throw er;
                console.log(result);
                res.json(result)
            }
        ) 
    }
}