#!/bin/sh
source=`pwd`
target="/efs/nginx/ss/wp-content/plugins/"
rsync -azvp --exclude '.git' --exclude 'node_modules' --exclude 'Gruntfile.js' $source $target 

listservers() {
	aws ec2 describe-instances --region us-east-1 --instance-ids \
$(aws autoscaling describe-auto-scaling-instances --region us-east-1 --output text \
--query "AutoScalingInstances[?AutoScalingGroupName=='silverscreen-webserver-autoscale'].InstanceId") \
--query "Reservations[].Instances[].PrivateIpAddress"| jq -r '.[]'
}

callCurl()
{
	curl -L "$1"
}
private=$(listservers)
urlPrefix="http://"
urlSuffix=":8080/opcache-reset.php"

for instance in $private
do
  url=$urlPrefix$instance$urlSuffix
  callCurl $url
done
