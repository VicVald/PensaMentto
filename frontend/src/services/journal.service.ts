import { createJournal } from "@/repository/journal.repository";
import { JournalType } from "@/models/Journal";

export async function saveJournal(journal: JournalType) {

    const cleanTags = (journal.tags ?? []).map(tag =>
        tag.trim().toLowerCase()
    );

    return createJournal({
        ...journal, //copia o objeto original
        tags: cleanTags //substitui apenas as tags
    });
}