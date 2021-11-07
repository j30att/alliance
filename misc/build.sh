set -e

export WORKSPACE=$PWD
export SCRIPT_PATH_RELATIVE="`dirname \"$0\"`"
export SCRIPT_PATH_ABSOLUTE="`( cd \"$SCRIPT_PATH_RELATIVE\" && pwd )`"
export DEST_DIR="/var/www/alliance"

echo "WORKSPACE: "$PWD
echo 'SCRIPT_PATH_RELATIVE' $SCRIPT_PATH_RELATIVE
echo 'SCRIPT_PATH_ABSOLUTE' $SCRIPT_PATH_ABSOLUTE
echo 'DEST_DIR' $DEST_DIR

[ -d $DEST_DIR ] || mkdir $DEST_DIR


cd $SCRIPT_PATH_ABSOLUTE/frontend
yarn install
yarn build
cp -rf $SCRIPT_PATH_ABSOLUTE/frontend/dist/alliance $DEST_DIR/front

[ -d $DEST_DIR/back ] || mkdir $DEST_DIR/back
cd $SCRIPT_PATH_ABSOLUTE/backend/api
yarn install
yarn build
cp -rf $SCRIPT_PATH_ABSOLUTE/backend/api/dist $DEST_DIR/back/dist
cp -rf $SCRIPT_PATH_ABSOLUTE/backend/api/yarn.lock $DEST_DIR/back/
cp -rf $SCRIPT_PATH_ABSOLUTE/backend/api/package.json $DEST_DIR/back/

cd $DEST_DIR/back
yarn install

chown -R www-data:www-data $DEST_DIR
