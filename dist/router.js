"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routing_1 = require("./routing");
exports.router = express_1.default.Router();
exports.router.get('/cover', routing_1.Cover.index);
exports.router.get('/offre', routing_1.Offre.limit);
exports.router.get('/annonce', routing_1.Annonce.index);
exports.router.get('/annonce-viewer', routing_1.Annonce.where);
exports.router.get('/credit', routing_1.Credit.index);
exports.router.get('/tokenizeauth', routing_1.Client.index);
exports.router.get('/compte', routing_1.Compte.index);
exports.router.get('/typeclient', routing_1.TypeClient.index);
exports.router.get('/typedemande', routing_1.TypeDemande.index);
exports.router.post('/contact', routing_1.Contact.index);
exports.router.post('/client-rendez', routing_1.PrendreRendez.index);
exports.router.get('/rendeznumber', routing_1.PrendreRendez.getNumber);
exports.router.post('/enreg-client', routing_1.Client.save);
exports.router.get('/client', routing_1.Client.index);
exports.router.get('/loggin', routing_1.Client.loggin);
exports.router.post('/demande', routing_1.Demande.index);
exports.router.get('/demande', routing_1.Demande.dernierDemande);
exports.router.get('/publication', routing_1.Publication.index);
exports.router.get('/demandeall', routing_1.Demande.allDemande);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3JvdXRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHNEQUE4QjtBQUM5Qix1Q0FBaUo7QUFDcEksUUFBQSxNQUFNLEdBQUcsaUJBQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUV2QyxjQUFNLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxlQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDbEMsY0FBTSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsZUFBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ2xDLGNBQU0sQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLGlCQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDdEMsY0FBTSxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsRUFBRSxpQkFBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQzdDLGNBQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLGdCQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDcEMsY0FBTSxDQUFDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUMxQyxjQUFNLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxnQkFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3BDLGNBQU0sQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLG9CQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDNUMsY0FBTSxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUUscUJBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUM5QyxjQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxpQkFBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3ZDLGNBQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsdUJBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNuRCxjQUFNLENBQUMsR0FBRyxDQUFDLGVBQWUsRUFBRSx1QkFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ3JELGNBQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLGdCQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDMUMsY0FBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNwQyxjQUFNLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxnQkFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3JDLGNBQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLGlCQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDdkMsY0FBTSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsaUJBQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUMvQyxjQUFNLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxxQkFBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQzlDLGNBQU0sQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLGlCQUFPLENBQUMsVUFBVSxDQUFDLENBQUMifQ==