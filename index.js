/**
 * Example problem with existing solution and passing test.
 * See problem 0 in the spec file for the assertion
 * @returns {string}
 */
 exports.example = () => 'hello world';

 function fromEntries(entries) {
   if (!entries || !entries[Symbol.iterator]) {
     throw new Error('fromEntries() requires a single iterable argument');
   }
 
   return Object.assign({}, ...entries.map(([key, val]) => ({ [key]: val })));
 }
 
 function omit(obj, propsToFilter = []) {
   const filtered = Object.entries(obj)
     .filter(([key]) => !propsToFilter.includes(key));
 
   return fromEntries(filtered);
 }
 
 exports.stripPrivateProperties = (fields, users) => users.map(user => omit(user, fields));
 
 exports.excludeByProperty = (field, users) => users.filter(user => !(field in user));
 
 exports.sumDeep = (arr) => {
   return arr.map(({ objects }) => {
     return {
       objects: objects
         .map(object => object.val)
         .reduce((acc, cur) => acc + cur, 0),
     };
   });
 };
 
 exports.applyStatusColor = (statusesColors, statuses) => {
   const statusColorMap = new Map(Object.entries(statusesColors)
     .reduce(
       (acc, [color, colorStatuses]) => [...acc, ...colorStatuses.map(status => [status, color])],
       [],
     ));
 
   return statuses
     .map(({ status }) => {
       return statusColorMap.has(status) && { status, color: statusColorMap.get(status) };
     })
     .filter(Boolean);
 };
 
 exports.createGreeting = (greetingFn, greeting) => name => greetingFn(greeting, name);
 
 exports.setDefaults = (defaultProps) => {
   const defaultPropsKeys = Object.keys(defaultProps);
 
   return (user) => {
     const userDefaultProps = fromEntries(defaultPropsKeys
       .map((defaultPropsKey) => {
         return !(defaultPropsKey in user) && [defaultPropsKey, defaultProps[defaultPropsKey]];
       })
       .filter(Boolean));
     return { ...userDefaultProps, ...user };
   };
 };
 
 exports.fetchUserByNameAndUsersCompany = async (userName, services) => {
   const [status, users] = await Promise.all([
     services.fetchStatus(),
     services.fetchUsers(),
   ]);
 
   const user = users[users.map(u => u.name).indexOf(userName)];
   if (!('companyId' in (user || {}))) {
     return { status, user };
   }
 
   return {
     company: await services.fetchCompanyById(user.companyId),
     status,
     user,
   };
 };
 