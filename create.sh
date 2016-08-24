REPO=$1
USERNAME=$2
curl="curl -u $USERNAME https:\/\/api.github.com\/user\/repos -d '{ \"name\": \"$REPO\" }'"
eval $curl
