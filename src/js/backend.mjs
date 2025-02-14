import PocketBase from "pocketbase";

const pb = new PocketBase("http://127.0.0.1:8090");

// export const events = await pb.collection("Conservatoire").getFullList();

// export async function getEvents() {
//     const today = new Date().toISOString(); // Récupérer la date du jour. Regardez la doc de la méthode toISOString pour plus d'informations: https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Date
//     let events = await pb.collection("Conservatoire").getFullList(
//         {
//             sort: "-date",
//             order: "desc",
//             filter: `date >= "${today}"`,
//         }
//     ); // Filtrer les événements passés en fonction de la date. Si la colonne date n'est pas dans votre collection, vous pouvez la remplacer par une autre colonne de type date.
//     events = events.map((event) => {
//         event.img = pb.files.getURL(event, event.imgUrl);
//         return event;
//     }); // Récupérer l'URL de l'image de chaque événement. Vous pouvez remplacer imgUrl par le nom de la colonne qui contient le nom de l'image.
//     events = events.map((event) => {
//         event.date = formatDate(event.date);
//         return event;
//     }); // Formater la date de chaque événement. Vous pouvez remplacer date par le nom de la colonne qui contient la date de l'événement. La fonction formatDate est importée du fichier utils.mjs.
//     return events;
// }

export async function getOffres() {
    try {
        let data = await pb.collection('Maison').getFullList({
            sort: '-created',
        });
        data = data.map((d) => {
            d.img = pb.files.getURL (d, d.images);
            return d;
        });
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en lisant la liste des maisons', error);
        return [];
    }
}

export async function getOffre(id) {
    try {
        let data = await pb.collection('Maison').getOne(id);
        data.imageUrl = pb.files.getURL(data, data.image);
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en lisant la maison', error);
        return null;
    }
}

export async function addOffre(house) {
    try {
        await pb.collection('Maison').create(house);
        return {
            success: true,
            message: 'Offre ajoutee avec succes'
        };
    } catch (error) {
        console.log('Une erreur est survenue en ajoutant la maison', error);
        return {
            success: false,
            message: 'Une erreur est survenue en ajoutant la maison'
        };
    }
}

export async function filterByPrix(prixMin, prixMax) {
    try {
        let data = await pb.collection('Maison').getFullList({
            sort: '-created',
            filter: `prix >= ${prixMin} && prix <= ${prixMax}`
        });
        data = data.map((maison) => {
            maison.img = pb.files.getURL(maison, maison.images);
            return maison;
        });
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en filtrant la liste des maisons', error);
        return [];
    }
}