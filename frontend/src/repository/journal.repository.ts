import Journal, { JournalType } from "@/models/Journal";

export async function createJournal(data: JournalType) {

    return Journal.create(data);
}