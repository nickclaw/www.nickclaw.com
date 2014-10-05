angular.module('app.services')
    .service('site', [
        'SITE_SCHEMA',
        function(SITE_SCHEMA) {

            var commonProto = {

                /**
                 * Returns the parent class
                 * @return {Instance}
                 */
                getParent: function() {
                    return this._parent;
                },

                /**
                 * Gets the instances url
                 * @return {String}
                 */
                getUrl: function() {
                    var parent = this.getParent();

                    if (parent) {
                        return parent.getUrl() + this.path + '/';
                    } else {
                        return '/';
                    }
                }
            };

            /**
             * The site state
             * @constructor
             * @param {Object} schema
             */
            function Site(schema) {
                _.extend(this, schema);

                this.sections = _.map(this.sections, function(sectionSchema) {
                    return new Section(sectionSchema, this);
                }, this);
            }

            _.extend(Site.prototype, commonProto, {

            });


            /**
             * The site state
             * @constructor
             * @param {Object} schema
             */
            function Section(schema, parent) {
                _.extend(this, schema);
                this._parent = parent;

                this.articles = _.map(this.articles, function(articleSchema) {
                    return new Article(articleSchema, this);
                }, this);

                this.expanded = false;
            }

            _.extend(Section.prototype, commonProto, {

            });


            /**
             * The site state
             * @constructor
             * @param {Object} schema
             */
            function Article(schema, parent) {
                _.extend(this, schema);
                this._parent = parent;
            }

            _.extend(Article.prototype, commonProto, {

            });

            return new Site(SITE_SCHEMA);
        }
    ]);
