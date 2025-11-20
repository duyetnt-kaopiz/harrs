// infrastructure/RecordRepository.js

export const RecordRepository = {
    updateRecord(appId, recordId, data) {
        return kintone.api(
            kintone.api.url("/k/v1/record", true),
            "PUT",
            {
                app: appId,
                id: recordId,
                record: data
            }
        );
    },

    getRecords(appId, query = "") {
        return kintone.api(
            kintone.api.url("/k/v1/records", true),
            "GET",
            { app: appId, query }
        );
    }
};
