const sql = require("./db.js");
const async = require('async');


const ItemModel = function (itemmodel) {
    this.id = itemmodel.id;
    this.name = itemmodel.name;
    this.categoryId = itemmodel.categoryId;
    this.createdDate = itemmodel.createdDate;
    this.desc = itemmodel.desc;
    this.imageUrl = itemmodel.imageUrl;
    this.price = itemmodel.price;
    this.userId - itemmodel.userId;
}

//Get user item 
ItemModel.findByUserId = (userId, result) => {
    console.log("userid>>" + userId)
    sql.query(`select itm.*, imge.url as imageUrl
        from Item itm
        inner join Image imge on itm.id = imge.itemId
        where itm.userId = ${userId}
               and imge.id = (
                select min(minCreateDate.id)
                from    (
                            select min(firstImage.createdDate), firstImage.id
                            from Image firstImage
                            where itm.id = firstImage.itemId
                        ) as minCreateDate
                )
        order by createdDate desc`, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
              }
              console.log("MyItems: ", res);
              result(null, res);
       


    });
};    // Delete user item
ItemModel.delete = (itemid, userid, result) => {
    console.log("userid>>>>:" + userid)
    console.log("itemid>>>:" + itemid)
    sql.query(`DELETE FROM Item WHERE Item.id =${itemid} AND userid=${userid}`, (err, res) => {

        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Item with the id
            result({ kind: "not_found" }, null);
            return;
        }
        result(null, res);
    });
};


ItemModel.findMostRecentItemsByCategoryMatchingSearchTerm = function (searchTerm, numberOfMostRecentItems, result) {
    const categorySql = `select distinct cat.*
                            from Category cat
                            inner join Item it on cat.id = it.categoryId 
                            inner join Image im on it.id = im.itemId
                            where it.name like '%${searchTerm}%' 
                                or it.desc like '%${searchTerm}%'                            
                            `;
    sql.query(categorySql, function (err, categories, fields) {
        if (err) return result(err, null);

        const mostRecentItemsByCategoryMatchingSearchTerm = [];

        async.each(categories, (category, callback) => {
            const itemSql = `select it.*, im.url as imageUrl
                from Item it
                inner join Image im on it.id = im.itemId
                where it.categoryId = ${category.id} 
                    and (it.name like '%${searchTerm}%' or it.desc like '%${searchTerm}%')
                    and im.id = (
                        select min(minCreateDate.id)
                        from    (
                                    select min(firstImage.createdDate), firstImage.id
                                    from Image firstImage
                                    where it.id = firstImage.itemId
                                ) as minCreateDate
                        )
                order by createdDate desc
                limit ${numberOfMostRecentItems}`


            sql.query(itemSql, (err, items, fields) => {
                mostRecentItemsByCategoryMatchingSearchTerm.push({
                    category: category,
                    mostRecentItems: items
                });

                callback();
            });
        }, err => {
            if (err) return result(err, null);

            return result(null, mostRecentItemsByCategoryMatchingSearchTerm);
        });
    });
}

ItemModel.findMostRecentItemsByCategoryMatchingSearchCriteria = function (searchTerm, categoryId, numberOfMostRecentItems, result) {
    let categorySql = `select distinct cat.*
                            from Category cat
                            inner join Item it on cat.id = it.categoryId 
                            inner join Image im on it.id = im.itemId                            
                            where (it.name like '%${searchTerm}%' 
                                or it.desc like '%${searchTerm}%')                            
                            `;

    if (categoryId > 0) {
        categorySql += ` and cat.id = ${categoryId}`;
    }

    sql.query(categorySql, function (err, categories, fields) {
        if (err) return result(err, null);

        const mostRecentItemsByCategoryMatchingSearchCriteria = [];

        async.each(categories, (category, callback) => {
            let itemSql = `select it.*, im.url as imageUrl
                from Item it
                inner join Image im on it.id = im.itemId
                where it.categoryId = ${category.id} 
                    and (it.name like '%${searchTerm}%' or it.desc like '%${searchTerm}%')
                    and im.id = (
                        select min(minCreateDate.id)
                        from    (
                                    select min(firstImage.createdDate), firstImage.id
                                    from Image firstImage
                                    where it.id = firstImage.itemId
                                ) as minCreateDate
                        )
                order by createdDate desc`

            if (numberOfMostRecentItems > 0) {
                itemSql += ` limit ${numberOfMostRecentItems}`;
            }

            sql.query(itemSql, (err, items, fields) => {
                mostRecentItemsByCategoryMatchingSearchCriteria.push({
                    category: category,
                    mostRecentItems: items
                });

                callback();
            });
        }, err => {
            if (err) return result(err, null);

            return result(null, mostRecentItemsByCategoryMatchingSearchCriteria);
        });
    });
}

module.exports = ItemModel;